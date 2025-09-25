import { useQuery } from "@tanstack/react-query";

export interface TopMenuItem {
  id?: string;
  title: string;
  url: string;
  description?: string;
  order?: number;
  parentId?: string;
  isActive?: boolean;
}

export function useTopMenu() {
  const { data: menuItems, isLoading, error } = useQuery<TopMenuItem[]>({
    queryKey: ['/api/uf/menu'],
    queryFn: async () => {
      const response = await fetch('/api/uf/menu', {
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
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    menuItems: menuItems || getFallbackMenu(),
    isLoading,
    error,
  };
}

// Fallback menu when API is unavailable
function getFallbackMenu(): TopMenuItem[] {
  return [
    {
      id: 'dashboard',
      title: 'Dashboard',
      url: '/',
      description: 'Main dashboard',
      order: 1,
    },
    {
      id: 'advancement',
      title: 'Advancement',
      url: '/advancement',
      description: 'Advancement tools',
      order: 2,
    },
    {
      id: 'analytics',
      title: 'Analytics',
      url: '/analytics',
      description: 'Data analytics',
      order: 3,
    },
    {
      id: 'reports',
      title: 'Reports',
      url: '/reports',
      description: 'Generate reports',
      order: 4,
    },
    {
      id: 'settings',
      title: 'Settings',
      url: '/settings',
      description: 'Application settings',
      order: 5,
    },
  ];
}