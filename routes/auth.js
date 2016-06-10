import mongoose from 'mongoose';
import User from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

export function signin(req, resp, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, user) => {
    if (err) {
      throw new Error(err);
    }

    if (!user) {
      resp.json({ success: false, message: 'Wrong username!' });
      return;
    }

    if (user.encodePassword(password) !== user.password) {
      resp.json({ success: false, message: 'Wrong password!' });
      return;
    }

    const token = jwt.encode(user, config.jwtSecret);
    resp.json({ success: true, jwt: token });
  });
}
