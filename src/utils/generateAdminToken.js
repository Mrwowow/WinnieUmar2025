import { authService } from '../services/authService';

export async function generateAdminToken() {
  try {
    const adminCredentials = {
      email: 'admin@wedding.com',
      password: 'admin123'
    };
    
    const response = await authService.login(adminCredentials.email, adminCredentials.password);
    
    if (response.token) {
      console.log('Admin authentication successful!');
      console.log('Token:', response.token);
      console.log('User:', response.user);
      
      // Store admin token for API calls
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.user));
      
      return {
        success: true,
        token: response.token,
        user: response.user
      };
    }
  } catch (error) {
    console.error('Failed to generate admin token:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Authentication failed'
    };
  }
}

export function getAdminToken() {
  return localStorage.getItem('adminToken');
}

export function isAdminAuthenticated() {
  const token = getAdminToken();
  const user = localStorage.getItem('adminUser');
  
  if (!token || !user) return false;
  
  try {
    const userData = JSON.parse(user);
    return userData.role === 'admin';
  } catch {
    return false;
  }
}