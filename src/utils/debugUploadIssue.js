import { adminAuthService } from '../services/adminAuthService';
import apiProxy from '../config/apiProxy';

export async function debugUploadIssue() {
  console.group('🐛 Debug Upload Issue');
  
  try {
    // Step 1: Test admin authentication
    console.log('1. Testing admin authentication...');
    let token;
    try {
      token = await adminAuthService.getAdminToken(true);
      console.log('✅ Admin auth successful');
      console.log('Token preview:', token.substring(0, 30) + '...');
    } catch (authError) {
      console.error('❌ Admin auth failed:', authError);
      return;
    }
    
    // Step 2: Test basic API connectivity
    console.log('2. Testing basic API connectivity...');
    try {
      const response = await apiProxy.get('/bridal-party', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Basic API connectivity works');
      console.log('Bridal party response:', response.data);
    } catch (apiError) {
      console.error('❌ Basic API connectivity failed:', apiError);
      console.error('Status:', apiError.response?.status);
      console.error('Data:', apiError.response?.data);
    }
    
    // Step 3: Test upload endpoints without file
    console.log('3. Testing upload endpoints (without file)...');
    const uploadEndpoints = ['/upload/image', '/upload/images', '/gallery/photos'];
    
    for (const endpoint of uploadEndpoints) {
      try {
        const response = await apiProxy.post(endpoint, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`✅ ${endpoint} endpoint accessible`);
      } catch (error) {
        console.log(`${endpoint} response:`, error.response?.status, error.response?.data?.message || error.message);
      }
    }
    
    // Step 4: Create minimal test file
    console.log('4. Creating minimal test file...');
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 50, 50);
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'debug-test.png', { type: 'image/png' });
    
    console.log('File details:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type,
      lastModified: testFile.lastModified
    });
    
    // Step 5: Test each upload endpoint with file
    console.log('5. Testing upload endpoints with file...');
    
    for (const endpoint of uploadEndpoints) {
      console.log(`\nTesting ${endpoint}...`);
      
      const formData = new FormData();
      
      // Try different field names that the API might expect
      const fieldNames = ['image', 'images', 'file', 'photo'];
      
      for (const fieldName of fieldNames) {
        console.log(`  Trying field name: ${fieldName}`);
        
        const testFormData = new FormData();
        testFormData.append(fieldName, testFile);
        
        try {
          const response = await apiProxy.post(endpoint, testFormData, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          console.log(`  ✅ SUCCESS with ${endpoint} using field ${fieldName}:`, response.data);
          return { endpoint, fieldName, result: response.data };
          
        } catch (error) {
          const status = error.response?.status;
          const message = error.response?.data?.message || error.message;
          console.log(`  ❌ ${fieldName}: ${status} - ${message}`);
        }
      }
    }
    
    console.log('❌ All upload attempts failed');
    
  } catch (error) {
    console.error('💥 Debug failed:', error);
  } finally {
    console.groupEnd();
  }
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.debugUploadIssue = debugUploadIssue;
  console.log('🐛 Debug function available: window.debugUploadIssue()');
}