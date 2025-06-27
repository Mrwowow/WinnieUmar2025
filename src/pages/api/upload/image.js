import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to use formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse multipart form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      allowEmptyFiles: false,
      filter: function ({ name, originalFilename, mimetype }) {
        // Only allow image files
        return mimetype && mimetype.startsWith('image/');
      },
    });

    const [fields, files] = await form.parse(req);
    
    // Get the uploaded file
    const uploadedFile = files.image?.[0];
    
    if (!uploadedFile) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Validate file type
    if (!uploadedFile.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: 'File must be an image' });
    }

    // In a real app, you would:
    // 1. Validate the image data
    // 2. Upload to a cloud storage service like AWS S3, Cloudinary, etc.
    // 3. Save the reference in your database
    
    // For demo purposes, we're simulating a successful upload with a placeholder URL
    // In production, you would move the file from uploadedFile.filepath to permanent storage
    const uniqueId = uuidv4();
    const fileExtension = path.extname(uploadedFile.originalFilename || '.jpg');
    const imageUrl = `/api/placeholder/400/400?id=${uniqueId}&ext=${fileExtension}`;
    
    console.log('Image upload successful:', {
      originalName: uploadedFile.originalFilename,
      size: uploadedFile.size,
      mimetype: uploadedFile.mimetype,
      filepath: uploadedFile.filepath,
      generatedUrl: imageUrl
    });
    
    return res.status(200).json({ 
      success: true, 
      url: imageUrl, // Change from imageUrl to url for consistency
      imageUrl, // Keep both for compatibility
      message: 'Image uploaded successfully',
      fileName: uploadedFile.originalFilename,
      size: uploadedFile.size
    });
  } catch (error) {
    console.error('Image upload error:', error);
    
    // Provide more specific error messages
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large. Maximum size is 10MB.' });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Invalid file field name. Expected "image".' });
    }
    
    return res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}