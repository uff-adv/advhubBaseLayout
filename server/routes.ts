import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import crypto from "crypto";
import passport, { isSamlConfigured } from "./auth";
import ufApiService from "./uf-api";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple CSRF protection middleware
  const csrfProtection = (req: any, res: any, next: any) => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      const token = req.headers["x-csrf-token"] || req.body._csrf;
      const sessionToken = (req.session as any)?.csrfToken;

      if (!token || !sessionToken || token !== sessionToken) {
        return res.status(403).json({ error: "Invalid CSRF token" });
      }
    }
    next();
  };

  // Generate CSRF token endpoint
  app.get("/api/auth/csrf-token", (req, res) => {
    if (!req.session) {
      return res.status(500).json({ error: "Session not available" });
    }

    const session = req.session as any;
    if (!session.csrfToken) {
      session.csrfToken = crypto.randomBytes(32).toString("hex");
    }

    res.json({ csrfToken: session.csrfToken });
  });

  // Authentication routes

  app.get('/api/auth/me', (req, res) => {
    if (req.isAuthenticated() && req.user) {
      // Return user with ALL SAML data from session or user object
      const userWithSaml = {
        ...req.user,
        samlProfile: (req.session as any)?.samlProfile || (req.user as any).samlProfile || {},
        samlRoles: (req.session as any)?.samlRoles || (req.user as any).samlRoles || []
      };
      res.json(userWithSaml);
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });

  // Check authentication status
  app.get("/api/auth/status", (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false });
    }
  });

  // UF API menu endpoint
  app.get("/api/uf/menu", async (req, res) => {
    try {
      const menuItems = await ufApiService.getTopMenu();
      
      // Transform menu items using UF API structure (navName → title, navUrl → url)
      const transformedItems = menuItems.map((item, index) => ({
        id: (item.NavId || item.navId)?.toString() || item.id || `menu-${index}`,
        title: item.NavName || item.navName || item.title || item.name || item.displayName || 'Menu Item',
        url: item.NavUrl || item.navUrl || item.url || item.link || item.href || '#',
        description: item.TabName || item.tabName || item.description || '',
        order: item.Order !== undefined ? item.Order : (item.order !== undefined ? item.order : index),
        parentId: (item.ParentNavId || item.parentNavId)?.toString() || item.parentId || null,
        navTypeId: item.NavTypeId || item.navTypeId || null,
        isActive: item.IsActive !== false && item.isActive !== false,
      }));
      res.json(transformedItems);
    } catch (error) {
      console.error('Failed to fetch UF menu data:', error);
      
      // Return fallback menu using the UF structure format (your sample data)
      const fallbackMenu = [
        { 
          id: '3605', 
          title: 'Announcement HUB', 
          url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=54', 
          description: 'Announcement HUB', 
          order: 1,
          navTypeId: 2
        },
        { 
          id: '3606', 
          title: 'Event HUB', 
          url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=52', 
          description: 'Event HUB', 
          order: 2,
          navTypeId: 2
        },
        { 
          id: '3607', 
          title: 'Knowledge HUB', 
          url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=48', 
          description: 'Knowledge HUB', 
          order: 3,
          navTypeId: 2
        },
        { 
          id: '3608', 
          title: 'Recognition HUB', 
          url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=53', 
          description: 'Recognition HUB', 
          order: 4,
          navTypeId: 2
        }
      ];
      
      console.log('Using fallback menu data (UF API unavailable)');
      res.status(200).json(fallbackMenu); // Still return 200 with fallback data
    }
  });

  // SAML login endpoint with configuration check
  app.get("/auth/saml/login", (req, res, next) => {
    if (!isSamlConfigured) {
      return res.status(503).json({
        error: "SAML authentication not configured",
        message: "SAML_CERT environment variable is required",
      });
    }
    passport.authenticate("saml", { failureRedirect: "/" })(req, res, next);
  });

  // SAML callback endpoint with configuration check
  app.post(
    "/auth/saml/callback",
    (req, res, next) => {
      console.log("SAML callback received");
      passport.authenticate("saml", {
        failureRedirect: "/login?error=callback_failed",
      })(req, res, next);
    },
    (req, res) => {
      console.log("SAML authentication completed");
      if (!req.user) {
        console.error("SAML authentication failed - no user object");
        return res.redirect("/login?error=no_user");
      }
      // Log the user in to establish session
      req.login(req.user, (loginErr) => {
        if (loginErr) {
          console.error("Session establishment failed");
          return res.redirect("/login?error=login_failed");
        }
        console.log("User session established successfully");
        // Extract SAML data from user object and save to session
        const user = req.user as any;
        if (user.samlProfile) {
          (req.session as any).samlProfile = user.samlProfile;
        }
        if (user.samlRoles) {
          (req.session as any).samlRoles = user.samlRoles;
        }
        // Get redirect URL from environment or default to '/'
        const redirectUrl = process.env.SAML_SUCCESS_REDIRECT || "/";
        console.log("Redirecting authenticated user");
        // Ensure session is saved before redirecting
        req.session.save((err) => {
          if (err) {
            console.error("Session save error");
          }
          res.redirect(redirectUrl);
        });
      });
    },
  );

  // Logout endpoint with CSRF protection
  app.post("/api/auth/logout", csrfProtection, (req, res) => {
    if (!req.session) {
      return res.status(500).json({ error: "Session not available" });
    }
    
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out" });
      }

      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session:", err);
          return res.status(500).json({ error: "Failed to destroy session" });
        }

        // Clear the session cookie
        res.clearCookie(process.env.COOKIE_NAME || "connect.sid");
        res.json({ message: "Logged out successfully" });
      });
    });
  });

  // Role check middleware
  const requireRoles = (requiredRoles: string[]) => {
    return (req: any, res: any, next: any) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const userRoles: string[] = (req.user as any)?.samlRoles || [];
      const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRequiredRole) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      next();
    };
  };

  // Example of protected route with role check
  // app.get("/api/admin/users", requireRoles(["Admin"]), (req, res) => {
  //   res.json({ users: [] });
  // });

  const httpServer = createServer(app);

  return httpServer;
}
