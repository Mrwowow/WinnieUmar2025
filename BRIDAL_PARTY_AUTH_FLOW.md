# Bridal Party Registration Authentication Flow

## Overview

The bridal party registration form is **publicly accessible** (no login required) but uses admin authentication internally to authorize API calls.

## How It Works

### 1. Public Form Access
- Users can access `/bridal-party/register` without logging in
- Form is completely public-facing
- No authentication required from the user

### 2. Internal Admin Authentication
When a user submits the form:

```javascript
// 1. Upload image with admin auth
const uploadResponse = await uploadService.uploadBridalPartyImage(file);

// 2. Register member with admin auth
await bridalPartyService.registerMember(registrationData);
```

### 3. Behind the Scenes

The `adminAuthService`:
- Automatically generates an admin token using default credentials
- Caches the token for 23 hours to minimize API calls
- Handles token refresh if needed
- All transparent to the end user

## Implementation Details

### Admin Credentials (Internal Use)
```javascript
email: 'admin@wedding.com'
password: 'admin123'
```

### Service Architecture

```
User Form Submission
    ↓
BridalPartyForm Component
    ↓
uploadService.uploadBridalPartyImage()
    ↓
adminAuthService.uploadWithAdminAuth()
    ↓
Backend API (with admin token)
```

### Key Files

1. **`/src/services/adminAuthService.js`**
   - Handles admin token generation and caching
   - Provides methods for authenticated requests

2. **`/src/services/bridalPartyService.js`**
   - Uses `adminAuthService` for registration calls
   - Transparent to the component layer

3. **`/src/services/uploadService.js`**
   - Has special method for bridal party uploads
   - Uses admin auth when `useAdminAuth` flag is true

## Security Considerations

1. **Token Caching**: Admin token is cached in memory (not localStorage) for security
2. **Auto-Refresh**: If token expires, service automatically gets a new one
3. **Error Handling**: Graceful fallback if admin auth fails
4. **Production**: Change default admin credentials before deployment

## Testing

Run the test script to verify the flow:
```bash
node scripts/test-bridal-party-auth.js
```

This will:
- Generate admin token
- Register a test member
- Verify registration success

## Benefits

1. **User Experience**: No login required for bridal party registration
2. **Security**: API endpoints remain protected
3. **Flexibility**: Easy to add more public forms using same pattern
4. **Maintenance**: Centralized admin auth handling