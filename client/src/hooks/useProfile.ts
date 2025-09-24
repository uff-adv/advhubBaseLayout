import { useQuery } from "@tanstack/react-query";

export interface ProfileData {
  FirstName: string;
  LastName: string;
  UFID: string;
}

export function useProfile() {
  const { data: profile, isLoading, error } = useQuery<ProfileData>({
    queryKey: ['/external/profile'],
    queryFn: async () => {
      console.log('Fetching profile from external API...');
      const response = await fetch('https://hubdev.uff.ufl.edu/BaseLayout/api/auth/me', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Profile API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Profile API response data:', data);
      
      // Check if we have the expected data structure
      if (!data || (!data.FirstName && !data.LastName && !data.UFID)) {
        console.warn('API returned unexpected data structure:', data);
        // Return null to trigger the fallback UI
        return null;
      }
      
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Better handling of fullName to avoid "undefined undefined"
  const getFullName = () => {
    if (!profile) return '';
    
    const firstName = profile.FirstName || '';
    const lastName = profile.LastName || '';
    
    if (!firstName && !lastName) {
      return 'User Name'; // Fallback for development
    }
    
    return `${firstName} ${lastName}`.trim();
  };

  return {
    profile,
    isLoading,
    error,
    fullName: getFullName(),
  };
}