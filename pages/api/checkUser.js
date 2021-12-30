const fs = require('fs');
const path = require('path');
const axios = require('axios');

export default async function handler(req, res) {
  if (!req.body) {
    res.status(403).json({ error: 'body is missing' });
    return;
  }
  var users = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/users.json'), 'utf8')
  );
  var currentUser = users.filter((x) => x.requestId == req.body.requestId);

  if (currentUser.length) {
    await axios.default
      .get(currentUser[0].endpoint, {
        headers: {
          Authorization: `Bearer ${currentUser[0].accessToken}`,
        },
      })
      .then((response) => {
        res.status(200).json(response.data);
      });
  }

  return res.status(403).json({ error: 'User not found' });
}
