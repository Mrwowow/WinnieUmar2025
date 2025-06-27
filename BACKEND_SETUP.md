# Backend Setup Instructions

## Quick Start

The application now includes a **fallback mode** that allows it to work without a backend server. However, for full functionality, you'll need to set up the backend.

## Current Status

### ✅ Without Backend (Fallback Mode)
- Bridal party form works with simulated submissions
- Shows "Demo Mode Active" warning
- Uploads return placeholder images
- Data is not persisted

### ❌ Features Requiring Backend
- User authentication
- Photo gallery
- Data persistence
- Real file uploads

## Setting Up the Backend

### 1. Create Backend Project

Follow the instructions in `BACKEND_INSTRUCTIONS.md` to create your Express backend.

### 2. Required Setup

The backend must have:

1. **Admin User Seeded**
   ```javascript
   {
     email: 'admin@wedding.com',
     password: 'admin123',
     role: 'admin'
   }
   ```

2. **Endpoints Required**
   - `POST /api/auth/login` - Authentication
   - `POST /api/bridal-party/register` - Member registration
   - `POST /api/upload/image` - Image uploads
   - `GET /api/bridal-party` - List members

### 3. Start Backend Server

```bash
cd wedding-api
npm install
npm run dev
```

Server should run on `http://localhost:5000`

### 4. Verify Connection

The frontend will automatically detect when the backend is available and switch from fallback mode to full API mode.

## Troubleshooting

### Backend Not Detected

1. Check backend is running on port 5000
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Check browser console for errors

### Authentication Errors

1. Ensure admin user is seeded in database
2. Verify credentials match exactly
3. Check JWT configuration

### CORS Issues

Backend must allow frontend origin:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Development Tips

1. **Start without backend**: The app works in fallback mode for quick development
2. **Add backend later**: Once ready, start the backend and the app will automatically use it
3. **Check mode**: Look for "Demo Mode Active" warning to know current status