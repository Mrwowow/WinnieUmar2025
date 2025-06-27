import { uploadService } from '../services/uploadService';

export async function testSimpleUpload() {
  console.group('🔥 Simple Upload Test');
  
  try {
    // Create a very simple test file
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 10, 10);
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'simple-test.png', { type: 'image/png' });
    
    console.log('Created test file:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type
    });
    
    // Test upload directly
    console.log('Testing upload...');
    const result = await uploadService.uploadBridalPartyImage(testFile);
    console.log('✅ Upload successful:', result);
    
    return result;
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    if (error.response) {
      console.error('Response:', error.response.status, error.response.data);
    }
    throw error;
  } finally {
    console.groupEnd();
  }
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.testSimpleUpload = testSimpleUpload;
  console.log('🔥 Simple upload test available: window.testSimpleUpload()');
}