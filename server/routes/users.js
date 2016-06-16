import User from '../models/user';
import Role from '../models/role';

export function getAllUsers(req, resp, next) {
  User.find({})
    .populate('role')
    .exec((err, users) => {
      if (err) {
        throw new Error(err);
      }
      resp.json({
        success: true,
        users: users.map(user => ({ id: user.id, username: user.username, role: user.role })),
      });
    });
}

export function addUser(req, resp, next) {
  const username = req.body.username;
  const password = req.body.password;
  const roleId = req.body.roleId;
  const user = new User({
    username,
    password,
    role: roleId,
  });
  user.save((err, savedUser) => {
    if (err) {
      throw new Error(err);
    }
    Role.findOne({ '_id': savedUser.role }, (err, role) => {
      if (err) {
        throw new Error(err);
      }
      resp.json({
        user: {
          id: savedUser.id,
          username: savedUser.username,
          role,
        },
      });
    });
  });
}

export function removeUser(req, resp, next) {
  const userId = req.params.id;
  User.remove({ '_id': userId }, (err) => {
    if (err) {
      throw new Error(err);
    }
    resp.json({ success: true });
  });
}
