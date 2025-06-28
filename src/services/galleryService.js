import api from '../config/api';
import apiProxy from '../config/apiProxy';

// Use proxy for CORS issues
const apiClient = apiProxy;

export const galleryService = {
  async getPhotos(page = 1, limit = 12) {
    const response = await apiClient.get('/gallery/photos', {
      params: { page, limit }
    });
    
    console.log('Gallery API response:', response.data);
    
    // Handle the new API response format
    if (response.data.success && response.data.data) {
      return {
        photos: response.data.data.photos || [],
        hasMore: response.data.data.pagination?.hasNextPage || false,
        total: response.data.data.pagination?.totalPhotos || 0,
        page: response.data.data.pagination?.currentPage || page,
        totalPages: response.data.data.pagination?.totalPages || 1
      };
    }
    
    // Fallback for old format
    return {
      photos: response.data.photos || [],
      hasMore: response.data.hasMore || false,
      total: response.data.total || 0,
      page: response.data.page || page
    };
  },

  async uploadPhoto(formData) {
    try {
      // First, upload the image to get the URL
      console.log('Uploading image to get URL...');
      const imageResponse = await apiClient.post('/upload/image', formData, {
        headers: {
          // Don't set Content-Type - let axios set it with boundary for FormData
        },
      });
      
      console.log('Image upload response:', imageResponse.data);
      
      // Extract the image URL from the upload response
      let imageUrl = '';
      if (imageResponse.data.url) {
        imageUrl = imageResponse.data.url;
      } else if (imageResponse.data.data && imageResponse.data.data.url) {
        imageUrl = imageResponse.data.data.url;
      } else if (imageResponse.data.imageUrl) {
        imageUrl = imageResponse.data.imageUrl;
      } else if (imageResponse.data.path) {
        imageUrl = imageResponse.data.path;
      } else if (imageResponse.data.location) {
        imageUrl = imageResponse.data.location;
      } else if (typeof imageResponse.data === 'string') {
        imageUrl = imageResponse.data;
      }
      
      if (!imageUrl) {
        throw new Error('No image URL returned from upload');
      }
      
      console.log('Image uploaded successfully, URL:', imageUrl);
      
      // Then, create the gallery entry with the image URL and caption
      const caption = formData.get('caption') || '';
      const galleryData = {
        imageUrl: imageUrl,
        caption: caption
      };
      
      console.log('Creating gallery entry with:', galleryData);
      
      const galleryResponse = await apiClient.post('/gallery/photos', galleryData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Gallery entry created:', galleryResponse.data);
      return galleryResponse.data;
      
    } catch (error) {
      console.error('Gallery upload error:', error);
      throw error;
    }
  },

  async deletePhoto(photoId) {
    const response = await apiClient.delete(`/gallery/photos/${photoId}`);
    return response.data;
  },

  async getPhotoById(photoId) {
    const response = await apiClient.get(`/gallery/photos/${photoId}`);
    return response.data;
  }
};