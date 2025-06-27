# Node.js Express API Backend Instructions

## Project Overview
Create a Node.js Express API backend for a wedding application that handles:
- User authentication
- Photo gallery management
- Bridal party registration
- File uploads

## Project Structure
```
wedding-api/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── galleryController.js
│   │   ├── bridalPartyController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Photo.js
│   │   └── BridalPartyMember.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── gallery.js
│   │   ├── bridalParty.js
│   │   └── upload.js
│   ├── utils/
│   │   └── validators.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Required Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## Environment Variables
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wedding-app
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Gallery
- `GET /api/gallery/photos` - Get all photos (with pagination)
- `POST /api/gallery/photos` - Upload new photo (authenticated)
- `DELETE /api/gallery/photos/:id` - Delete photo (authenticated)

### Bridal Party
- `GET /api/bridal-party` - Get all bridal party members
- `POST /api/bridal-party/register` - Register new member
- `PUT /api/bridal-party/:id` - Update member info (authenticated)
- `DELETE /api/bridal-party/:id` - Delete member (authenticated)

### Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['guest', 'admin']),
  createdAt: Date
}
```

### Photo Model
```javascript
{
  url: String,
  publicId: String,
  caption: String,
  uploadedBy: ObjectId (ref: User),
  tags: [String],
  createdAt: Date
}
```

### BridalPartyMember Model
```javascript
{
  name: String,
  role: String (enum: ['bridesmaid', 'groomsman', 'maid_of_honor', 'best_man']),
  bio: String,
  imageUrl: String,
  order: Number,
  createdAt: Date
}
```

## Security Requirements
1. Implement JWT authentication
2. Use bcrypt for password hashing
3. Add rate limiting to prevent abuse
4. Implement CORS with proper origins
5. Use Helmet for security headers
6. Validate and sanitize all inputs
7. Implement proper error handling

## Features to Implement
1. **Authentication System**
   - JWT-based authentication
   - Role-based access control (admin/guest)
   - Password reset functionality

2. **Photo Gallery**
   - Upload photos to Cloudinary
   - Pagination and filtering
   - Caption and tag support
   - Admin-only delete functionality

3. **Bridal Party Management**
   - CRUD operations for bridal party members
   - Order management for display
   - Image upload for member photos

4. **File Upload**
   - Multer for file handling
   - Cloudinary integration
   - Image optimization
   - File size and type validation

## Additional Considerations
1. Add request logging with Morgan
2. Implement database connection pooling
3. Add API documentation (Swagger/OpenAPI)
4. Set up testing with Jest
5. Add database seeding scripts
6. Implement caching for frequently accessed data
7. Add WebSocket support for real-time features

## Deployment Ready
- Configure for production environment
- Add health check endpoint
- Set up proper logging
- Configure database indexes
- Add monitoring endpoints