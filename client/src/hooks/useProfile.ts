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
      const response = await fetch('https://hubdev.uff.ufl.edu/BaseLayout/api/auth/me', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    profile,
    isLoading,
    error,
    fullName: profile ? `${profile.FirstName} ${profile.LastName}` : '',
  };
}