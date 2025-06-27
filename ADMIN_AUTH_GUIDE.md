# Admin Authentication Guide

## Default Admin Credentials

The application comes with default admin credentials for development:

- **Email**: `admin@wedding.com`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials in production!

## How to Use Admin Authentication

### 1. Via the UI (Development Mode)

When running in development mode, the login modal includes:
- An "Admin Login" quick access button
- A "Quick Fill" button to auto-populate admin credentials

### 2. Via API Call

```javascript
// Generate admin token
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@wedding.com',
    password: 'admin123'
  }),
});

const { token, user } = await response.json();
```

### 3. Using the Test Script

Run the provided test script:

```bash
node scripts/test-admin-auth.js
```

This will:
- Authenticate with admin credentials
- Display the JWT token
- Test a protected endpoint
- Show usage instructions

### 4. Programmatically in Code

```javascript
import { generateAdminToken } from '@/utils/generateAdminToken';

// Generate and store admin token
const result = await generateAdminToken();
if (result.success) {
  console.log('Admin token:', result.token);
}
```

## Admin Features

Once authenticated as admin, you can:

1. **Delete photos** from the gallery
2. **Manage bridal party members**
3. **Access admin-only API endpoints**
4. **View all user submissions**

## Using the Token in API Calls

### With Axios (Already Configured)

The axios instance in `src/config/api.js` automatically includes the token:

```javascript
import api from '@/config/api';

// Token is automatically included
const response = await api.get('/protected-endpoint');
```

### Manual Usage

```javascript
fetch('http://localhost:5000/api/protected-endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Security Notes

1. **Development Only**: The admin quick login features are only available when `NODE_ENV=development`
2. **Change Default Credentials**: Always change the default admin credentials in production
3. **Token Expiration**: Tokens expire after 30 days (configurable in backend)
4. **HTTPS Required**: Use HTTPS in production to protect token transmission

## Troubleshooting

### Backend Not Running
If you see "ECONNREFUSED" errors:
1. Ensure your backend is running on port 5000
2. Check the `NEXT_PUBLIC_API_URL` in `.env.local`

### Invalid Credentials
If authentication fails:
1. Verify the backend has the default admin user seeded
2. Check that the credentials match exactly
3. Ensure the backend JWT secret is configured

### Token Not Working
If authenticated requests fail:
1. Check token hasn't expired
2. Verify the Authorization header format: `Bearer <token>`
3. Ensure the backend middleware is properly configured