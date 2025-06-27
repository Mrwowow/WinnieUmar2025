import { bridalPartyService } from '../services/bridalPartyService';
import { uploadService } from '../services/uploadService';

export async function testBridalPartyRegistration() {
  console.group('👰 Testing Bridal Party Registration');
  
  try {
    // Step 1: Test upload first
    console.log('1. Testing image upload...');
    
    // Create a test image
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 50, 50);
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'test-profile.png', { type: 'image/png' });
    
    let imageUrl = '';
    try {
      const uploadResponse = await uploadService.uploadBridalPartyImage(testFile);
      console.log('✅ Upload successful:', uploadResponse);
      
      // Extract URL from response
      if (uploadResponse.url) {
        imageUrl = uploadResponse.url;
      } else if (uploadResponse.data && uploadResponse.data.url) {
        imageUrl = uploadResponse.data.url;
      } else if (typeof uploadResponse === 'string') {
        imageUrl = uploadResponse;
      }
      
      console.log('Extracted image URL:', imageUrl);
    } catch (error) {
      console.error('❌ Upload failed:', error);
      console.log('Continuing without image...');
    }
    
    // Step 2: Test registration
    console.log('2. Testing member registration...');
    
    const testMember = {
      name: 'Test User',
      phone: '+1234567890',
      email: `test.user.${Date.now()}@example.com`,
      bio: 'This is a test bio for the bridal party member.',
      maritalStatus: 'single',
      toast: 'Wishing you both all the happiness in the world!',
      role: 'bridesmaid'
    };
    
    // Add image URL if we have one - use exact same logic as the form
    if (imageUrl && imageUrl.trim()) {
      // According to BACKEND_INSTRUCTIONS.md, the BridalPartyMember model has imageUrl field
      testMember.imageUrl = imageUrl;
      console.log('Including image URL (imageUrl field):', imageUrl);
      console.log('Image URL validation - length:', imageUrl.length, 'type:', typeof imageUrl, 'starts with http:', imageUrl.startsWith('http'));
    } else {
      console.log('No image URL to include');
    }
    
    console.log('Registration data:', testMember);
    
    try {
      const result = await bridalPartyService.registerMember(testMember);
      console.log('✅ Registration successful:', result);
      
      // Check if the image URL was preserved
      if (result.imageUrl || result.image || result.photo) {
        console.log('✅ Image URL was included in result:', 
          result.imageUrl || result.image || result.photo);
      } else {
        console.warn('⚠️ No image URL found in result');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Registration failed:', error);
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
  window.testBridalPartyRegistration = testBridalPartyRegistration;
  console.log('👰 Test function available: window.testBridalPartyRegistration()');
}