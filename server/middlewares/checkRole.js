export function adminRole(req, resp, next) {
  if (req.user.role.name === 'admin') {
    next();
  } else {
    resp.status(401);
    resp.json({ success: false, message: 'Unauthorized' });
  }
}
