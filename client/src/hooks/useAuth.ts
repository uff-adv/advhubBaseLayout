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

  // Logout mutation with CSRF protection
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Get CSRF token first
      const csrfResponse = await fetch('/api/auth/csrf-token');
      const { csrfToken } = await csrfResponse.json();
      
      // Use the apiRequest function with additional headers
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        credentials: 'same-origin',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
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