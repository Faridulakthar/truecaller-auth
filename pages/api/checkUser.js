const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (!req.body) {
    res.status(403).json({ error: 'body is missing' });
    return;
  }
  var users = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/users.json'), 'utf8')
  );
  var currentUser = users.filter(
    (x) => x.requestId.toString() === req.body.requestId.toString()
  );

  if (currentUser.length) {
    return res.status(200).json({
      token: currentUser[0].accessToken,
      url: currentUser[0].endpoint,
    });
  }

  return res.status(403).json({ error: 'User not found' });
}
