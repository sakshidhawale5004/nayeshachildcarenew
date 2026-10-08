import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  return res.status(200).json(current_data);
}
