#!/usr/bin/env node

const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function testAdminAuth() {
  console.log('🔐 Testing Admin Authentication...');
  console.log(`API URL: ${API_URL}`);
  console.log('-----------------------------------');
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@wedding.com',
      password: 'admin123'
    });
    
    const { token, user } = response.data;
    
    console.log('✅ Authentication Successful!');
    console.log('\n📧 User Details:');
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  ID: ${user.id || user._id}`);
    
    console.log('\n🔑 JWT Token:');
    console.log(`  ${token}`);
    
    console.log('\n📋 Usage Instructions:');
    console.log('  1. Add to Authorization header: Bearer ' + token);
    console.log('  2. Store in localStorage: localStorage.setItem("token", "' + token + '")');
    console.log('  3. Use in API calls with axios interceptor');
    
    // Test protected endpoint
    console.log('\n🧪 Testing Protected Endpoint...');
    const protectedResponse = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Protected endpoint accessed successfully!');
    console.log('  Response:', protectedResponse.data);
    
  } catch (error) {
    console.error('❌ Authentication Failed!');
    console.error(`  Error: ${error.response?.data?.message || error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️  Backend API is not running!');
      console.error('  Please start your backend server on port 5000');
    }
  }
}

// Run the test
testAdminAuth();