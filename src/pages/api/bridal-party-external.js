// Proxy endpoint to fetch bridal party members from external API
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch directly from the external API
      const externalApiUrl = 'https://wedding-app-api.vercel.app/api/bridal-party';
      
      console.log('Fetching bridal party from external API:', externalApiUrl);
      
      const response = await fetch(externalApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any headers the external API might need
          'User-Agent': 'WeddingApp/1.0',
        },
      });
      
      console.log('External API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`External API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('External API response:', data);
      
      // Extract the members array from the nested structure
      let members = [];
      if (data.success && data.data && data.data.members) {
        members = data.data.members;
      } else if (data.members) {
        members = data.members;
      } else if (Array.isArray(data)) {
        members = data;
      }
      
      // Forward the response in a consistent format
      res.status(200).json({
        success: true,
        data: members,
        members: members, // For compatibility
        source: 'external-api'
      });
      
    } catch (error) {
      console.error('Error fetching from external API:', error);
      
      // Fallback to mock data if external API fails
      console.log('Using fallback mock data');
      const mockMembers = [
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'maid_of_honor',
          bio: 'Best friend since college, always there for the bride.',
          imageUrl: '/api/placeholder/300/300?id=sarah',
          maritalStatus: 'single',
          toast: 'Wishing you both a lifetime of happiness!',
          phone: '+1234567890',
          email: 'sarah@example.com'
        },
        {
          id: 2,
          name: 'Michael Smith',
          role: 'best_man',
          bio: 'Groom\'s brother and lifelong companion.',
          imageUrl: '/api/placeholder/300/300?id=michael',
          maritalStatus: 'married',
          toast: 'So proud to see you both together!',
          phone: '+1234567891',
          email: 'michael@example.com'
        },
        {
          id: 3,
          name: 'Emily Davis',
          role: 'bridesmaid',
          bio: 'College roommate and lifelong friend.',
          imageUrl: '/api/placeholder/300/300?id=emily',
          maritalStatus: 'single',
          toast: 'Can\'t wait to celebrate with you!',
          phone: '+1234567892',
          email: 'emily@example.com'
        }
      ];
      
      res.status(200).json({ 
        success: true, 
        data: mockMembers,
        members: mockMembers,
        source: 'fallback',
        message: 'Using fallback data due to external API unavailability'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }
}
