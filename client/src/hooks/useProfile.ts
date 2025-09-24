import { useQuery } from "@tanstack/react-query";

export interface ProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  samlProfile: {
    UFID: string;
    [key: string]: any;
  };
  samlRoles: string[];
}

export function useProfile() {
  const { data: profile, isLoading, error } = useQuery<ProfileData>({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Extract full name from SAML data
  const getFullName = () => {
    if (!profile) return '';
    
    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';
    
    if (!firstName && !lastName) {
      return '';
    }
    
    return `${firstName} ${lastName}`.trim();
  };

  // Extract UFID from SAML profile
  const getUFID = () => {
    if (!profile?.samlProfile) return '';
    return profile.samlProfile.UFID || '';
  };

  return {
    profile,
    isLoading,
    error,
    fullName: getFullName(),
    ufid: getUFID(),
  };
}