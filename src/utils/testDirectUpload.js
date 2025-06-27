import apiProxy from '../config/apiProxy';
import { adminAuthService } from '../services/adminAuthService';

export async function testDirectUpload() {
  console.group('🔧 Testing Direct Upload');
  
  try {
    // Step 1: Get admin token
    console.log('1. Getting admin token...');
    const token = await adminAuthService.getAdminToken(true);
    console.log('✅ Token obtained:', token.substring(0, 20) + '...');
    
    // Step 2: Create test file
    console.log('2. Creating test file...');
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 100, 100);
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'direct-test.png', { type: 'image/png' });
    console.log('✅ Test file created:', testFile.name, testFile.size, 'bytes');
    
    // Step 3: Test direct proxy call
    console.log('3. Testing direct proxy call...');
    
    const formData = new FormData();
    formData.append('image', testFile);
    
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`- ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
    }
    
    try {
      const response = await apiProxy.post('/upload/image', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Direct upload successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Direct upload failed:', error);
      
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);
      }
      
      // Step 4: Try with different endpoint
      console.log('4. Trying alternative endpoints...');
      
      const endpoints = ['/upload/images', '/gallery/photos'];
      
      for (const endpoint of endpoints) {
        console.log(`Trying ${endpoint}...`);
        try {
          const altResponse = await apiProxy.post(endpoint, formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`✅ ${endpoint} worked:`, altResponse.data);
          return altResponse.data;
        } catch (altError) {
          console.log(`❌ ${endpoint} failed:`, altError.response?.status, altError.response?.data?.message);
        }
      }
      
      throw error;
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
  window.testDirectUpload = testDirectUpload;
  console.log('🔧 Test function available: window.testDirectUpload()');
}