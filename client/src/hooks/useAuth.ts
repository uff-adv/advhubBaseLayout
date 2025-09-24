import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  samlProfile?: any;
  samlRoles?: string[];
}

export interface AuthStatus {
  authenticated: boolean;
  user?: User;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: authStatus, isLoading, error } = useQuery<AuthStatus>({
    queryKey: ['/api/auth/status'],
    retry: 1,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get current user details
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth/me'],
    enabled: authStatus?.authenticated || false,
    retry: 1,
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('/api/auth/logout', 'POST'),
    onSuccess: () => {
      // Invalidate all auth-related queries
      queryClient.invalidateQueries({ queryKey: ['/api/auth'] });
      // Redirect to login
      window.location.href = '/login';
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  // Start SAML login
  const startSamlLogin = () => {
    window.location.href = '/auth/saml/login';
  };

  return {
    isLoading,
    isAuthenticated: authStatus?.authenticated || false,
    user: user || authStatus?.user,
    error,
    logout,
    startSamlLogin,
    isLoggingOut: logoutMutation.isPending,
  };
}