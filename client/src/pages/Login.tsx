import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const { startSamlLogin, isAuthenticated } = useAuth();
  const [location] = useLocation();
  
  // Get error from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'callback_failed':
        return 'SAML authentication failed. Please try again.';
      case 'no_user':
        return 'Authentication succeeded but no user information was received.';
      case 'login_failed':
        return 'Failed to establish user session. Please try again.';
      default:
        return null;
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-primary rounded-sm flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-lg">UF</span>
          </div>
          <h1 className="text-2xl font-bold">AdvancementHUB</h1>
          <p className="text-muted-foreground">University of Florida Mercury Template</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              User Not Authenticated
            </CardTitle>
            <CardDescription>
              You must authenticate through University of Florida's Single Sign-On (SSO) to access this application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-3">
              <Button 
                onClick={startSamlLogin}
                className="w-full"
                size="lg"
                data-testid="button-saml-login"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign in with UF SSO
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Click above to authenticate using your University of Florida GatorLink credentials.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            This application requires UF SAML authentication.
            <br />
            Contact your administrator if you're having trouble accessing the system.
          </p>
        </div>
      </div>
    </div>
  );
}