// This is a development utility endpoint to generate admin token
// Remove this in production!

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Forbidden in production' });
  }

  try {
    const adminCredentials = {
      email: 'admin@wedding.com',
      password: 'admin123'
    };

    // Make request to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminCredentials),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({
        message: 'Admin token generated successfully',
        token: data.token,
        user: data.user,
        usage: 'Add this token to Authorization header as: Bearer ' + data.token
      });
    } else {
      res.status(response.status).json({
        message: 'Failed to generate admin token',
        error: data.message
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}