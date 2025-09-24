import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isAuthenticated, startSamlLogin } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Checking authentication...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
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
              <CardTitle>User Not Authenticated</CardTitle>
              <CardDescription>
                You must authenticate through University of Florida's Single Sign-On (SSO) to access this application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={startSamlLogin}
                className="w-full"
                size="lg"
                data-testid="button-auth-guard-login"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign in with UF SSO
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}