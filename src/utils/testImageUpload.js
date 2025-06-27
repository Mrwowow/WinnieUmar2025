import { uploadService } from '../services/uploadService';
import { adminAuthService } from '../services/adminAuthService';

export async function testImageUpload() {
  console.group('📸 Testing Image Upload');
  
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
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Draw a colorful test image
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = '#4ECDC4';
    ctx.fillRect(100, 0, 100, 100);
    ctx.fillStyle = '#45B7D1';
    ctx.fillRect(0, 100, 100, 100);
    ctx.fillStyle = '#96CEB4';
    ctx.fillRect(100, 100, 100, 100);
    
    // Add some text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TEST', 100, 110);
    
    // Convert to blob and then to file
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'test-upload.png', { type: 'image/png' });
    
    console.log('✅ Test file created:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type
    });
    
    // Step 3: Test the upload with admin auth
    console.log('3. Testing bridal party image upload...');
    console.log('FormData details:');
    const formData = new FormData();
    formData.append('image', testFile);
    console.log('- FormData entries:', Array.from(formData.entries()));
    
    try {
      const result = await uploadService.uploadBridalPartyImage(testFile);
      console.log('✅ Bridal party upload successful:', result);
      
      // Step 4: Test regular upload (if logged in)
      console.log('4. Testing regular image upload...');
      try {
        const regularResult = await uploadService.uploadImage(testFile, false);
        console.log('✅ Regular upload successful:', regularResult);
      } catch (regularError) {
        console.log('ℹ️ Regular upload not available (user not logged in):', regularError.message);
      }
      
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
  window.testImageUpload = testImageUpload;
  console.log('📸 Test function available: window.testImageUpload()');
}