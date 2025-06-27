import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class AdminAuthService {
  constructor() {
    this.adminToken = null;
    this.tokenExpiry = null;
    this.authInProgress = null;
    this.retryCount = 0;
    this.maxRetries = 2;
  }

  async getAdminToken(forceRefresh = false) {
    // If force refresh, clear existing token
    if (forceRefresh) {
      this.adminToken = null;
      this.tokenExpiry = null;
    }

    // Check if we have a valid cached token
    if (this.adminToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      console.log('Using cached admin token');
      return this.adminToken;
    }

    // If authentication is already in progress, wait for it
    if (this.authInProgress) {
      console.log('Auth already in progress, waiting...');
      return this.authInProgress;
    }

    // Start new authentication
    this.authInProgress = this._authenticate();
    
    try {
      const token = await this.authInProgress;
      return token;
    } finally {
      this.authInProgress = null;
    }
  }

  async _authenticate() {
    try {
      console.log('Generating new admin token...');
      console.log('API URL:', `${API_URL}/auth/login`);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: 'admin@wedding.com',
        password: 'admin123'
      });

      console.log('Auth response status:', response.status);
      console.log('Auth response data:', response.data);

      // Check if response is successful
      if (response.status !== 200) {
        throw new Error(`Authentication failed with status: ${response.status}`);
      }

      // Check for different possible response formats
      let token = null;
      if (response.data?.token) {
        token = response.data.token;
      } else if (response.data?.data?.token) {
        token = response.data.data.token;
      } else if (response.data?.access_token) {
        token = response.data.access_token;
      } else if (response.data?.accessToken) {
        token = response.data.accessToken;
      }

      if (!token) {
        console.error('No token found in response. Response structure:', JSON.stringify(response.data, null, 2));
        throw new Error(`Authentication succeeded but no token found. Response: ${JSON.stringify(response.data)}`);
      }

      this.adminToken = token;
      // Set token expiry to 23 hours from now
      this.tokenExpiry = new Date(Date.now() + 23 * 60 * 60 * 1000);
      this.retryCount = 0; // Reset retry count on successful auth

      console.log('Admin token generated successfully, length:', token.length);
      return this.adminToken;
    } catch (error) {
      console.error('Failed to generate admin token:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      // If rate limited, throw specific error
      if (error.response?.status === 429) {
        throw new Error('Rate limited. Please try again later.');
      }
      
      // If unauthorized, provide specific message
      if (error.response?.status === 401) {
        throw new Error('Invalid admin credentials. Please check email and password.');
      }
      
      // If server error, provide specific message
      if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      // If it's our custom error, re-throw as is
      if (error.message.includes('Authentication succeeded but no token found')) {
        throw error;
      }
      
      throw new Error(`Authentication failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async makeAdminRequest(method, endpoint, data = null) {
    try {
      const token = await this.getAdminToken();
      
      const config = {
        method,
        url: `${API_URL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      this.retryCount = 0; // Reset retry count on success
      return response.data;
    } catch (error) {
      // If unauthorized and we haven't exceeded retry limit
      if (error.response?.status === 401 && this.retryCount < this.maxRetries) {
        console.log('Token expired or invalid, refreshing and retrying...');
        this.retryCount++;
        
        // Force refresh token
        await this.getAdminToken(true);
        
        // Retry the request
        return this.makeAdminRequest(method, endpoint, data);
      }
      
      // Reset retry count and throw error
      this.retryCount = 0;
      throw error;
    }
  }

  async uploadWithAdminAuth(endpoint, formData) {
    try {
      const token = await this.getAdminToken();
      
      console.log('Uploading with admin auth to:', `${API_URL}${endpoint}`);
      
      const response = await axios.post(`${API_URL}${endpoint}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      this.retryCount = 0; // Reset retry count on success
      return response.data;
    } catch (error) {
      console.error('Upload error:', error.response?.status, error.response?.data);
      
      // If unauthorized and we haven't exceeded retry limit
      if (error.response?.status === 401 && this.retryCount < this.maxRetries) {
        console.log('Token expired or invalid, refreshing and retrying upload...');
        this.retryCount++;
        
        // Force refresh token
        await this.getAdminToken(true);
        
        // Retry the upload
        return this.uploadWithAdminAuth(endpoint, formData);
      }
      
      // Reset retry count and throw error
      this.retryCount = 0;
      
      // Provide better error message
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check admin credentials.');
      } else if (error.response?.status === 413) {
        throw new Error('File too large. Please choose a smaller image.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      
      throw error;
    }
  }

  clearCache() {
    this.adminToken = null;
    this.tokenExpiry = null;
    this.authInProgress = null;
    this.retryCount = 0;
  }
}

// Export singleton instance
export const adminAuthService = new AdminAuthService();