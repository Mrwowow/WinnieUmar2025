import api from '../config/api';
import apiProxy from '../config/apiProxy';
import { adminAuthService } from './adminAuthService';

// Use proxy for CORS issues
const apiClient = apiProxy;

export const uploadService = {
  async uploadImage(file, useAdminAuth = false) {
    const formData = new FormData();
    formData.append('image', file);

    if (useAdminAuth) {
      // Use admin auth for public uploads (like bridal party registration)
      return await adminAuthService.uploadWithAdminAuth('/upload/image', formData);
    } else {
      // Use proxy to avoid CORS
      const response = await apiClient.post('/upload/image', formData, {
        headers: {
          // Don't set Content-Type - let axios set it with boundary
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

    const response = await apiClient.post('/upload/images', formData, {
      headers: {
        // Don't set Content-Type - let axios set it with boundary
      },
    });
    return response.data;
  },

  // Specific method for bridal party image uploads
  async uploadBridalPartyImage(file) {
    return this.uploadImage(file, true);
  }
};