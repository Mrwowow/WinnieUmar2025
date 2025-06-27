import { uploadService } from '../services/uploadService';
import { adminAuthService } from '../services/adminAuthService';

export async function testUpload() {
  console.group('📤 Testing Image Upload');
  
  try {
    // Step 1: Test admin authentication first
    console.log('1. Testing admin authentication...');
    try {
      const token = await adminAuthService.getAdminToken(true);
      console.log('✅ Admin token obtained:', token.substring(0, 20) + '...');
    } catch (error) {
      console.error('❌ Admin auth failed:', error.message);
      throw new Error('Cannot proceed without authentication');
    }
    
    // Step 2: Create a test image file
    console.log('2. Creating test image file...');
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple test image
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(50, 0, 50, 50);
    ctx.fillStyle = '#0000FF';
    ctx.fillRect(0, 50, 50, 50);
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(50, 50, 50, 50);
    
    // Convert to blob and then to file
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
    
    console.log('✅ Test file created:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type
    });
    
    // Step 3: Test the upload
    console.log('3. Testing upload...');
    try {
      const result = await uploadService.uploadBridalPartyImage(testFile);
      console.log('✅ Upload successful:', result);
      return result;
    } catch (error) {
      console.error('❌ Upload failed:', error);
      
      // Try to get more details about the error
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
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
  window.testUpload = testUpload;
  console.log('📤 Test function available: window.testUpload()');
}