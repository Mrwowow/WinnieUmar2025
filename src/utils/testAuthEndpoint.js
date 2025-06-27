import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function testAuthEndpoint() {
  console.group('🧪 Testing Auth Endpoint');
  
  try {
    console.log('Testing endpoint:', `${API_URL}/auth/login`);
    console.log('Credentials:', { email: 'admin@wedding.com', password: 'admin123' });
    
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@wedding.com',
      password: 'admin123'
    });
    
    console.log('✅ Request successful!');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', response.headers);
    console.log('Data:', response.data);
    console.log('Data Type:', typeof response.data);
    console.log('Data Keys:', Object.keys(response.data || {}));
    
    // Check for token in various locations
    const tokenLocations = [
      { path: 'data.token', value: response.data?.token },
      { path: 'data.data.token', value: response.data?.data?.token },
      { path: 'data.access_token', value: response.data?.access_token },
      { path: 'data.accessToken', value: response.data?.accessToken },
      { path: 'data.jwt', value: response.data?.jwt },
      { path: 'data.authToken', value: response.data?.authToken }
    ];
    
    console.log('Token location analysis:');
    tokenLocations.forEach(({ path, value }) => {
      console.log(`  ${path}: ${value ? `Found (${typeof value}, length: ${value.length})` : 'Not found'}`);
    });
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Request failed!');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response statusText:', error.response.statusText);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
      console.error('Request:', error.request);
    }
    
    throw error;
  } finally {
    console.groupEnd();
  }
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.testAuthEndpoint = testAuthEndpoint;
  console.log('🧪 Test function available: window.testAuthEndpoint()');
}