const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (!req.body) {
    res.status(403).json({ error: 'body is missing' });
    return;
  }
  const filePath = path.join(process.cwd(), 'data/users.json');
  var users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  users.push(req.body);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 4));
  return res.status(200).json({ status: 'OK' });
}
