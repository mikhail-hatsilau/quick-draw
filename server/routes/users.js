import User from '../models/user';
import Role from '../models/role';
import Participant from '../models/participant';

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
  User.findOne({ username }, (err, currentUser) => {
    if (err) {
      throw new Error(err);
    }
    if (currentUser) {
      resp.status(403);
      resp.json({
        success: false,
        message: 'Username is already used',
      });
      return;
    }
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
  });
}

export function removeUser(req, resp, next) {
  const userId = req.params.id;
  User.remove({ '_id': userId }, (err) => {
    if (err) {
      throw new Error(err);
    }

    Participant.remove({ user: userId }, (err) => {
      if (err) {
        throw new Error(err);
      }
    });    
    resp.json({ success: true });
  });
}

export function updateUser(req, resp, next) {
  const userId = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const roleId = req.body.role;
  const updateOptions = {
    username,
    role: roleId,
  };

  User.findById(userId, (err, userforUpdate) => {
    if (err) {
      throw new Error(err);
    }
    if (!userforUpdate) {
      resp.status(404);
      resp.json({
        success: false,
        message: 'No such user',
      });
      return;
    }

    if (password) {
      updateOptions.password = userforUpdate.encodePassword(password);
    }

    User.update(
      { '_id': userforUpdate.id },
      updateOptions,
      (err) => {
        if (err) {
          throw new Error(err);
        }
        Role.findById(roleId, (err, role) => {
          if (err) {
            throw new Error(err);
          }
          resp.json({
            success: true,
            user: {
              id: userforUpdate.id,
              username,
              role,
            },
          });
        });
      }
    );
  });
}
