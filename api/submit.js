import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body || {};
  
  // Vercel serverless functions are read-only except for the /tmp directory.
  // Note: Data in /tmp will be lost when the serverless function goes to sleep.
  const file = '/tmp/requests.json';
  
  let current_data = [];
  if (fs.existsSync(file)) {
    try {
      const json_content = fs.readFileSync(file, 'utf8');
      current_data = JSON.parse(json_content) || [];
    } catch (e) {
      current_data = [];
    }
  }

  const new_entry = {
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    parent_name: data.parent_name || '',
    phone: data.phone || '',
    email: data.email || '',
    therapy: data.therapy || '',
    message: data.message || ''
  };

  current_data.unshift(new_entry);

  try {
    fs.writeFileSync(file, JSON.stringify(current_data, null, 2));
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to write to file on Vercel' });
  }
}
