import { adminAuthService } from '../services/adminAuthService';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function debugAdminAuth() {
  console.group('🔍 Admin Authentication Debug');
  
  try {
    // Step 1: Test basic connectivity
    console.log('1. Testing API connectivity...');
    try {
      await axios.get(`${API_URL}/health`, { timeout: 5000 });
      console.log('✅ API is reachable');
    } catch (error) {
      console.log('❌ API not reachable:', error.message);
      throw new Error('Cannot reach API');
    }
    
    // Step 2: Test authentication
    console.log('2. Testing admin authentication...');
    try {
      const token = await adminAuthService.getAdminToken(true); // Force refresh
      console.log('✅ Admin token obtained:', token.substring(0, 20) + '...');
    } catch (error) {
      console.log('❌ Admin auth failed:', error.message);
      throw error;
    }
    
    // Step 3: Test protected endpoint
    console.log('3. Testing protected endpoint...');
    try {
      const result = await adminAuthService.makeAdminRequest('get', '/auth/me');
      console.log('✅ Protected endpoint accessible:', result);
    } catch (error) {
      console.log('❌ Protected endpoint failed:', error.message);
      throw error;
    }
    
    // Step 4: Test upload endpoint
    console.log('4. Testing upload endpoint...');
    try {
      // Create a small test file
      const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      const formData = new FormData();
      formData.append('image', testFile);
      
      await adminAuthService.uploadWithAdminAuth('/upload/image', formData);
      console.log('✅ Upload endpoint accessible');
    } catch (error) {
      console.log('❌ Upload endpoint failed:', error.message);
      if (error.response?.status === 400) {
        console.log('ℹ️ This might be expected if the endpoint doesn\'t accept text files');
      }
    }
    
    console.log('🎉 Debug completed successfully!');
    
  } catch (error) {
    console.error('💥 Debug failed:', error.message);
  } finally {
    console.groupEnd();
  }
}

// Auto-run in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.debugAdminAuth = debugAdminAuth;
  console.log('🔧 Debug function available: window.debugAdminAuth()');
}