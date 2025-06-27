import api from '../config/api';
import { adminAuthService } from './adminAuthService';

export const uploadService = {
  async uploadImage(file, useAdminAuth = false) {
    const formData = new FormData();
    formData.append('image', file);

    if (useAdminAuth) {
      // Use admin auth for public uploads (like bridal party registration)
      return await adminAuthService.uploadWithAdminAuth('/upload/image', formData);
    } else {
      // Use regular user auth
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  },

  async uploadMultipleImages(files) {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    const response = await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Specific method for bridal party image uploads
  async uploadBridalPartyImage(file) {
    return this.uploadImage(file, true);
  }
};