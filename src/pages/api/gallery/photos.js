// This would typically connect to a database or storage service
// For demo purposes, we're using an in-memory array
let galleryPhotos = [
    // Format: { id, url, uploadedBy, timestamp }
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Return all photos
      return res.status(200).json({ photos: galleryPhotos });
    } 
    
    else if (req.method === 'POST') {
      try {
        const { photoUrl, guestName } = req.body;
        
        if (!photoUrl || !guestName) {
          return res.status(400).json({ message: 'Photo URL and guest name are required' });
        }
        
        const newPhoto = {
          id: Date.now().toString(),
          url: photoUrl,
          uploadedBy: guestName,
          timestamp: new Date().toISOString()
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
    
    return res.status(405).json({ message: 'Method not allowed' });
  }