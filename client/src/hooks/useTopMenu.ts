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
    queryKey: ['/api/uf/topmenu'],
    queryFn: async () => {
      try {
        const response = await fetch('https://advapi.uff.ufl.edu/api/Test/TopMenu', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          // If API fails, return fallback menu items
          console.warn(`UF API returned ${response.status}, using fallback menu`);
          return getFallbackMenu();
        }
        
        const data = await response.json();
        
        // Transform API data to our format if needed
        if (Array.isArray(data)) {
          return data.map((item: any, index: number) => ({
            id: item.id || `menu-${index}`,
            title: item.title || item.name || item.displayName || 'Menu Item',
            url: item.url || item.link || item.href || '#',
            description: item.description || '',
            order: item.order || index,
            parentId: item.parentId || null,
            isActive: item.isActive !== false,
          }));
        }
        
        return getFallbackMenu();
      } catch (error) {
        console.error('Error fetching top menu:', error);
        return getFallbackMenu();
      }
    },
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
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