import api from '../config/api';
import { adminAuthService } from '../services/adminAuthService';

export async function testBridalPartyAPI() {
  console.group('🎭 Testing Bridal Party API');
  
  try {
    // Test 1: Direct API call
    console.log('1. Testing direct API call to /bridal-party...');
    
    try {
      const response = await api.get('/bridal-party');
      console.log('✅ Direct API call successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Direct API call failed:', error);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      }
      
      // Test 2: Try with admin authentication
      console.log('2. Testing with admin authentication...');
      
      try {
        const response = await adminAuthService.makeAdminRequest('get', '/bridal-party');
        console.log('✅ Admin auth call successful:', response);
        return response;
      } catch (adminError) {
        console.error('❌ Admin auth call failed:', adminError);
      }
      
      // Test 3: Try with full URL
      console.log('3. Testing with full URL...');
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/bridal-party`;
      console.log('Full URL:', fullUrl);
      
      try {
        const response = await fetch(fullUrl);
        const data = await response.json();
        console.log('✅ Full URL fetch successful:', data);
        return data;
      } catch (fetchError) {
        console.error('❌ Full URL fetch failed:', fetchError);
      }
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error.message);
    throw error;
  } finally {
    console.groupEnd();
  }
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.testBridalPartyAPI = testBridalPartyAPI;
  console.log('🎭 Test function available: window.testBridalPartyAPI()');
}