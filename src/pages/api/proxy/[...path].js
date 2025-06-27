export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPath}`;

  console.log('Proxying request to:', apiUrl);
  console.log('Method:', req.method);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Content-Length:', req.headers['content-length']);

  try {
    // Prepare headers - forward most headers except host
    const forwardHeaders = {};
    
    // Forward important headers
    if (req.headers.authorization) {
      forwardHeaders.Authorization = req.headers.authorization;
    }
    if (req.headers['content-type']) {
      forwardHeaders['Content-Type'] = req.headers['content-type'];
    }
    if (req.headers['content-length']) {
      forwardHeaders['Content-Length'] = req.headers['content-length'];
    }

    let body;
    
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // Read the raw body as a stream
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
      
      console.log('Raw body size:', body.length);
      console.log('Body starts with:', body.slice(0, 100).toString());
    }

    console.log('Forwarding headers:', forwardHeaders);

    const response = await fetch(apiUrl, {
      method: req.method,
      headers: forwardHeaders,
      body: body,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Forward response
    const responseData = await response.text();
    console.log('Response data:', responseData);
    
    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    res.status(response.status);
    
    // Try to parse as JSON, fallback to text
    try {
      const jsonData = JSON.parse(responseData);
      res.json(jsonData);
    } catch {
      res.send(responseData);
    }
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy request failed', 
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}