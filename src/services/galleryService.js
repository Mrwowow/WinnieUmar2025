import api from '../config/api';

export const galleryService = {
  async getPhotos(page = 1, limit = 12) {
    const response = await api.get('/gallery/photos', {
      params: { page, limit }
    });
    return response.data;
  },

  async uploadPhoto(formData) {
    const response = await api.post('/gallery/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deletePhoto(photoId) {
    const response = await api.delete(`/gallery/photos/${photoId}`);
    return response.data;
  },

  async getPhotoById(photoId) {
    const response = await api.get(`/gallery/photos/${photoId}`);
    return response.data;
  }
};