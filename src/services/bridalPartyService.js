import api from '../config/api';
import { adminAuthService } from './adminAuthService';

export const bridalPartyService = {
  async getMembers() {
    const response = await api.get('/bridal-party');
    return response.data;
  },

  async registerMember(memberData) {
    // Use admin authentication for registration
    // This allows public users to register without needing to login
    try {
      const response = await adminAuthService.makeAdminRequest(
        'post',
        '/bridal-party/register',
        memberData
      );
      return response;
    } catch (error) {
      console.error('Failed to register bridal party member:', error);
      throw error;
    }
  },

  async updateMember(memberId, memberData) {
    const response = await api.put(`/bridal-party/${memberId}`, memberData);
    return response.data;
  },

  async deleteMember(memberId) {
    const response = await api.delete(`/bridal-party/${memberId}`);
    return response.data;
  }
};