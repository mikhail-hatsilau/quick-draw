import Role from '../models/role';

export function getAllRoles(req, resp, next) {
  Role.find({}, (err, roles) => {
    if (err) {
      throw new Error(err);
    }
    resp.json({
      roles,
    });
  });
}
