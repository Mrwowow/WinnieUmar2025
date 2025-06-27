import api from '../config/api';
import apiProxy from '../config/apiProxy';
import { adminAuthService } from './adminAuthService';

// Use proxy for CORS issues
const apiClient = apiProxy;

export const bridalPartyService = {
  async getMembers() {
    try {
      // First try to fetch via our server-side proxy to avoid CORS
      console.log('🔄 Fetching bridal party via server-side proxy...');
      const response = await fetch('/api/bridal-party-external');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Successfully fetched bridal party data:', {
        memberCount: data.data?.length || 0,
        source: data.source,
        hasData: !!data.data
      });
      
      // Return the data array, handling different response formats
      const members = data.data || data.members || data || [];
      console.log('📊 Processed members:', members.length);
      return members;
      
    } catch (error) {
      console.error('❌ Error fetching bridal party members via server proxy:', error);
      
      // Fallback to local API endpoint as last resort
      console.log('🔄 Attempting to fetch from local API endpoint as fallback...');
      try {
        const response = await fetch('/api/bridal-party');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Local fallback successful');
        return data.data || data.members || [];
      } catch (localError) {
        console.error('❌ Local API fetch also failed:', localError);
        // Return empty array rather than throwing to prevent app crash
        console.log('📝 Returning empty array to prevent crash');
        return [];
      }
    }
  },

  async registerMember(memberData) {
    // Use admin authentication for registration first
    // This allows public users to register without needing to login
    try {
      const response = await adminAuthService.makeAdminRequest(
        'post',
        '/bridal-party/register',
        memberData
      );
      return response;
    } catch (error) {
      console.error('Failed to register bridal party member via admin auth:', error);
      
      // Fallback to local API endpoint
      console.log('Attempting to register via local API endpoint...');
      try {
        const response = await fetch('/api/bridal-party', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || data.member || data;
      } catch (localError) {
        console.error('Local API registration also failed:', localError);
        throw localError;
      }
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