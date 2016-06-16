import User from '../models/user';
import Role from '../models/role';
import jwt from 'jwt-simple';
import config from '../config';

export function signin(req, resp, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .populate('role')
    .exec((err, user) => {
      if (err) {
        throw new Error(err);
      }

      if (!user) {
        resp.status(404);
        resp.json({ success: false, message: 'Wrong username!' });
        return;
      }

      if (user.encodePassword(password) !== user.password) {
        resp.status(403);
        resp.json({ success: false, message: 'Wrong password!' });
        return;
      }
      const token = jwt.encode(user, config.jwtSecret);
      resp.json({
        success: true,
        jwt: token,
        user: {
          username: user.username,
          role: user.role,
        },
      });
    });
}
