import api from '../config/api';
import apiProxy from '../config/apiProxy';

// Use proxy for CORS issues
const apiClient = apiProxy;

export const galleryService = {
  async getPhotos(page = 1, limit = 12) {
    const response = await apiClient.get('/gallery/photos', {
      params: { page, limit }
    });
    return response.data;
  },

  async uploadPhoto(formData) {
    const response = await apiClient.post('/gallery/photos', formData, {
      headers: {
        // Don't set Content-Type - let axios set it with boundary
      },
    });
    return response.data;
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