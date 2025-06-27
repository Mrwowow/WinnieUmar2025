export async function testProxyUpload() {
  console.group('🔍 Test Proxy Upload');
  
  try {
    // Create test file
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(0, 0, 10, 10);
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const testFile = new File([blob], 'proxy-test.png', { type: 'image/png' });
    
    console.log('Test file created:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type
    });
    
    // Create FormData manually to inspect
    const formData = new FormData();
    formData.append('image', testFile);
    
    // Log FormData contents
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`- ${key}:`, value);
      if (value instanceof File) {
        console.log(`  File details: ${value.name}, ${value.size} bytes, ${value.type}`);
      }
    }
    
    // Test direct fetch to proxy
    console.log('Testing direct fetch to proxy...');
    
    const response = await fetch('/api/proxy/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-token'
      },
      body: formData
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body (raw):', responseText);
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('Response body (JSON):', responseJson);
    } catch (e) {
      console.log('Response is not JSON');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }
    
    return responseText;
    
  } catch (error) {
    console.error('❌ Proxy test failed:', error);
    throw error;
  } finally {
    console.groupEnd();
  }
}

// Make it available globally
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.testProxyUpload = testProxyUpload;
  console.log('🔍 Proxy test available: window.testProxyUpload()');
}