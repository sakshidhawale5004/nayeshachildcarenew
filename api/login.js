export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  // Hardcoded credentials
  if (username === 'admin' && password === 'admin_password123') {
    return res.status(200).json({ success: true, token: 'mock-secure-token' });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
}
