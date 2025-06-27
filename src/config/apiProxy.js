import axios from 'axios';

// Create axios instance that uses our proxy
const apiProxy = axios.create({
  baseURL: '/api/proxy',
  // Don't set default Content-Type - let it be determined per request
});

// Request interceptor to add token
apiProxy.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set Content-Type for non-FormData requests
    if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    console.log('Proxy Request:', config.method, config.url, {
      hasFormData: config.data instanceof FormData,
      contentType: config.headers['Content-Type']
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiProxy.interceptors.response.use(
  (response) => {
    console.log('Proxy Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Proxy Error:', error);
    
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login modal
      if (!window.location.pathname.includes('/')) {
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiProxy;