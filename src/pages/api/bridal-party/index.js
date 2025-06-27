// API endpoint for bridal party members
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // For demo purposes, return some mock data
      // In a real app, you would fetch from your database
      const mockMembers = [
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'maid_of_honor',
          bio: 'Best friend since college, always there for the bride.',
          imageUrl: '/api/placeholder/300/300?id=sarah',
          maritalStatus: 'single',
          toast: 'Wishing you both a lifetime of happiness!'
        },
        {
          id: 2,
          name: 'Michael Smith',
          role: 'best_man',
          bio: 'Groom\'s brother and lifelong companion.',
          imageUrl: '/api/placeholder/300/300?id=michael',
          maritalStatus: 'married',
          toast: 'So proud to see you both together!'
        }
      ];
      
      res.status(200).json({ 
        success: true, 
        data: mockMembers,
        members: mockMembers // Support both formats
      });
    } catch (error) {
      console.error('Error fetching bridal party members:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching bridal party members' 
      });
    }
  } else if (req.method === 'POST') {
    // Handle member registration
    try {
      const memberData = req.body;
      
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'bio', 'maritalStatus', 'toast', 'role'];
      const missingFields = requiredFields.filter(field => !memberData[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }
      
      // In a real app, you would:
      // 1. Validate the data more thoroughly
      // 2. Store it in a database
      // 3. Send confirmation emails
      // 4. Return the created member with an ID
      
      console.log('New bridal party member registration:', memberData);
      
      const newMember = {
        id: Date.now(), // Simple ID generation for demo
        ...memberData,
        createdAt: new Date().toISOString()
      };
      
      res.status(201).json({ 
        success: true, 
        message: 'Registration successful',
        data: newMember,
        member: newMember // Support both formats
      });
    } catch (error) {
      console.error('Error processing registration:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error processing registration' 
      });
    }
  } else {
    // Only allow GET and POST requests
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }
}
