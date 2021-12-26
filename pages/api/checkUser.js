import { usersRepo } from '../../helper/user-repo';

export default function handler(req, res) {
  if (!req.body) {
    res.status(403).json({ error: 'body is missing' });
    return;
  }

  usersRepo.create(req.body);
  return res.status(200).json({ status: 'OK' });
}
