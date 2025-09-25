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
      id: '3605',
      title: 'Announcement HUB',
      url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=54',
      description: 'Announcement HUB',
      order: 1,
    },
    {
      id: '3606',
      title: 'Event HUB',
      url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=52',
      description: 'Event HUB',
      order: 2,
    },
    {
      id: '3607',
      title: 'Knowledge HUB',
      url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=48',
      description: 'Knowledge HUB',
      order: 3,
    },
    {
      id: '3608',
      title: 'Recognition HUB',
      url: 'https://ufadvancement.quickbase.com/db/btajmkmy7?a=dbpage&pageID=53',
      description: 'Recognition HUB',
      order: 4,
    },
  ];
}