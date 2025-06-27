# Admin Authentication Quick Start

## 🔐 Default Admin Credentials

```
Email: admin@wedding.com
Password: admin123
```

## 🚀 Quick Access Methods

### 1. Development UI
- Click "Guest Login" in the header
- Click the yellow "Login as Admin" button
- Or use "Quick Fill" → "Admin Credentials"

### 2. Test Script
```bash
node scripts/test-admin-auth.js
```

### 3. Direct API Call
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wedding.com","password":"admin123"}'
```

## 🎯 Admin Features

- **Delete Photos**: Hover over gallery photos to see delete button
- **Manage Members**: Full CRUD access to bridal party
- **Admin Badge**: Yellow shield icon in header when logged in as admin

## ⚠️ Important Notes

1. These features only appear in development mode
2. Change default credentials before deploying to production
3. Admin status is indicated by a shield icon in the header