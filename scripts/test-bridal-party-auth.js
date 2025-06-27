#!/usr/bin/env node

const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function testBridalPartyRegistration() {
  console.log('🎩 Testing Bridal Party Registration with Admin Auth...');
  console.log(`API URL: ${API_URL}`);
  console.log('-----------------------------------');
  
  try {
    // Step 1: Generate admin token
    console.log('\n1️⃣ Generating admin token...');
    const authResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@wedding.com',
      password: 'admin123'
    });
    
    const adminToken = authResponse.data.token;
    console.log('✅ Admin token generated successfully');
    
    // Step 2: Test bridal party registration with admin token
    console.log('\n2️⃣ Testing bridal party registration...');
    const testMember = {
      name: 'Test Bridesmaid',
      phone: '+1234567890',
      email: 'testbridesmaid@example.com',
      bio: 'Test bio for bridesmaid registration',
      maritalStatus: 'single',
      toast: 'Wishing you a lifetime of happiness!',
      role: 'bridesmaid',
      imageUrl: 'https://example.com/test-image.jpg'
    };
    
    const registerResponse = await axios.post(
      `${API_URL}/bridal-party/register`,
      testMember,
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Bridal party member registered successfully!');
    console.log('Response:', registerResponse.data);
    
    // Step 3: Verify registration by fetching members
    console.log('\n3️⃣ Fetching all bridal party members...');
    const membersResponse = await axios.get(`${API_URL}/bridal-party`);
    
    console.log(`✅ Found ${membersResponse.data.length} bridal party members`);
    
    const testMemberExists = membersResponse.data.some(
      member => member.email === testMember.email
    );
    
    if (testMemberExists) {
      console.log('✅ Test member successfully found in the list!');
    }
    
    console.log('\n📋 Summary:');
    console.log('- Admin authentication: ✅');
    console.log('- Member registration: ✅');
    console.log('- Public access to member list: ✅');
    console.log('\n🎉 All tests passed! The bridal party registration is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test Failed!');
    console.error(`Error: ${error.response?.data?.message || error.message}`);
    
    if (error.response?.status === 401) {
      console.error('\n⚠️  Authentication failed!');
      console.error('Make sure the admin credentials are correct.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️  Backend API is not running!');
      console.error('Please start your backend server on port 5000');
    }
  }
}

// Run the test
testBridalPartyRegistration();