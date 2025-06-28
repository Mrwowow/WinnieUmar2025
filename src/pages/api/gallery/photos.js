import jwt from 'jsonwebtoken';

// This would typically connect to a database or storage service
// For demo purposes, we're using an in-memory array
let galleryPhotos = [
    // Format: { id, url, uploadedBy, timestamp, caption }
  ];

// Function to verify JWT token
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  try {
    // Use the same secret as your auth system
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'wedding-secret-key');
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

export default function handler(req, res) {
  // Verify authentication for all requests except GET (for public viewing)
  let user = null;
  if (req.method !== 'GET') {
    user = verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  }

  if (req.method === 'GET') {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedPhotos = galleryPhotos.slice(startIndex, endIndex);
    const hasMore = endIndex < galleryPhotos.length;
    
    return res.status(200).json({ 
      photos: paginatedPhotos,
      hasMore,
      total: galleryPhotos.length,
      page,
      limit
    });
  } 
  
  else if (req.method === 'POST') {
    try {
      const { caption } = req.body;
      
      // For file uploads, we'll use the image from the request
      // This is a simplified implementation - in production you'd handle multipart/form-data
      if (!req.body.imageUrl && !req.body.url) {
        return res.status(400).json({ message: 'Image is required' });
      }
      
      const imageUrl = req.body.imageUrl || req.body.url;
      
      const newPhoto = {
        id: Date.now().toString(),
        _id: Date.now().toString(), // For compatibility
        url: imageUrl,
        caption: caption || '',
        uploadedBy: {
          name: user.name || user.email || 'Guest',
          id: user.id || user._id
        },
        createdAt: new Date().toISOString(),
        timestamp: new Date().toISOString() // For backward compatibility
      };
      
      // Add to the beginning of the array to show newest first
      galleryPhotos.unshift(newPhoto);
      
      return res.status(201).json({ 
        success: true,
        photo: newPhoto
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  else if (req.method === 'DELETE') {
    try {
      const photoId = req.query.id || req.url.split('/').pop();
      
      // Only admin users can delete photos
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
      
      const photoIndex = galleryPhotos.findIndex(photo => 
        photo.id === photoId || photo._id === photoId
      );
      
      if (photoIndex === -1) {
        return res.status(404).json({ message: 'Photo not found' });
      }
      
      galleryPhotos.splice(photoIndex, 1);
      
      return res.status(200).json({ 
        success: true,
        message: 'Photo deleted successfully'
      });
    } catch (error) {
      console.error('Delete error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}