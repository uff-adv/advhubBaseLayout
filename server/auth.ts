import passport from "passport";
import { Strategy as SamlStrategy } from "passport-saml";
import { storage } from "./storage";
import type { User } from "@shared/schema";

// Track SAML configuration status
export const isSamlConfigured = !!process.env.SAML_CERT;

// Only configure SAML strategy if certificate is provided
if (isSamlConfigured) {
  passport.use(
    new SamlStrategy(
      {
        entryPoint:
          process.env.SAML_ENTRY_POINT ||
          "https://advidp.uff.ufl.edu/saml2/auth",
        issuer:
          process.env.SAML_ISSUER || "https://advhub.uff.ufl.edu/Intranet/Auth",
        callbackUrl:
          process.env.SAML_CALLBACK_URL ||
          "http://localhost:5000/auth/saml/callback",
        cert: process.env.SAML_CERT!, // Already checked for existence above
      },
      async (profile: any, done: any) => {
        try {
          // Extract roles from SAML attributes
          const roles: string[] = [];
          if (profile.attributes) {
            // Common role attribute names in SAML
            const roleAttributes = ['Role', 'role', 'roles', 'Roles', 'groups', 'Groups', 'memberOf', 'group'];
            
            for (const attr of roleAttributes) {
              if (profile.attributes[attr]) {
                const roleValues = Array.isArray(profile.attributes[attr]) 
                  ? profile.attributes[attr] 
                  : [profile.attributes[attr]];
                roles.push(...roleValues);
              }
            }
          }

          // Extract user information from SAML profile with complete attributes
          const user: User = {
            id: profile.nameID || profile.id,
            email: profile.email || profile.mail || profile.attributes?.email || profile.attributes?.mail,
            displayName: profile.displayName || profile.attributes?.displayName,
            firstName: profile.firstName || profile.givenName || profile.attributes?.firstName || profile.attributes?.givenName,
            lastName: profile.lastName || profile.surname || profile.attributes?.lastName || profile.attributes?.surname,
            samlProfile: {
              ...profile,
              // Include all attributes for complete profile
              attributes: profile.attributes || {}
            },
            samlRoles: roles
          };

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      },
    ),
  );
} else {
  console.warn("SAML authentication not configured: SAML_CERT environment variable is missing");
}

// Serialize user for session - save the entire user object
passport.serializeUser((user: any, done) => {
  done(null, user);
});

// Deserialize user from session - restore the complete user object
passport.deserializeUser(async (userData: User, done) => {
  try {
    // Return the complete user object with SAML profile and roles
    done(null, userData);
  } catch (error) {
    done(error, null);
  }
});

export default passport;