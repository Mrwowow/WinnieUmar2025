export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { inviteCode, guestName } = req.body;
  
      // In a real app, you would validate the invite code against a database
      // This is a simplified example
      const validInviteCodes = ['WEDDING2025', 'WinnieOmar', 'GUEST123'];
      
      if (!inviteCode || !guestName) {
        return res.status(400).json({ message: 'Invite code and name are required' });
      }
  
      if (!validInviteCodes.includes(inviteCode.toUpperCase())) {
        return res.status(401).json({ message: 'Invalid invite code' });
      }
  
      // In a production app, you would also create a session or JWT
      return res.status(200).json({ 
        success: true, 
        guestName,
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }