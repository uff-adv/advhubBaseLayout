// University of Florida API service for token-based authentication

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

interface UFMenuItem {
  id?: string;
  title?: string;
  name?: string;
  displayName?: string;
  url?: string;
  link?: string;
  href?: string;
  description?: string;
  order?: number;
  parentId?: string;
  isActive?: boolean;
  [key: string]: any;
}

class UFApiService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly tokenUrl = 'https://advids.uff.ufl.edu/connect/token';
  private readonly menuUrl = 'https://advapi.uff.ufl.edu/api/Test/TopMenu';

  constructor() {
    this.clientId = process.env.UF_CLIENT_ID || '';
    this.clientSecret = process.env.UF_CLIENT_SECRET || '';
    
    if (!this.clientId || !this.clientSecret) {
      console.warn('UF API credentials not configured. Menu will use fallback data.');
    }
  }

  /**
   * Get OAuth2 token from UF authentication service
   */
  private async getToken(): Promise<string> {
    // Check if we have a valid token that hasn't expired
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error('UF API credentials not configured');
    }

    try {
      const response = await fetch(this.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const tokenData: TokenResponse = await response.json();
      this.token = tokenData.access_token;
      
      // Set expiry to 90% of the actual expiry time for safety buffer
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000 * 0.9);
      
      console.log('Successfully obtained UF API token');
      return this.token;
    } catch (error) {
      console.error('Error getting UF API token:', error);
      throw error;
    }
  }

  /**
   * Fetch menu data from UF API using authenticated token
   */
  async getTopMenu(): Promise<UFMenuItem[]> {
    try {
      const token = await this.getToken();
      
      const response = await fetch(this.menuUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Menu API request failed: ${response.status} ${response.statusText}`);
      }

      const menuData = await response.json();
      console.log('Successfully fetched UF menu data');
      
      // Normalize the menu data structure
      if (Array.isArray(menuData)) {
        return menuData;
      }
      
      // Handle different response structures
      if (menuData.data && Array.isArray(menuData.data)) {
        return menuData.data;
      }
      
      if (menuData.items && Array.isArray(menuData.items)) {
        return menuData.items;
      }
      
      console.warn('Unexpected menu data structure:', menuData);
      return [];
    } catch (error) {
      console.error('Error fetching UF menu data:', error);
      throw error;
    }
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret);
  }
}

// Export singleton instance
export const ufApiService = new UFApiService();
export default ufApiService;