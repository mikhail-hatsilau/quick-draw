import express from 'express';
import { signin } from './auth';
import { adminRole } from '../middlewares/checkRole';
import { getAllUsers, addUser, removeUser } from './users';
import { getAllRoles } from './roles';
import passport from 'passport';
import passportJwt from '../passportStrategies/passport';
const router = express.Router();

passportJwt(passport);

// router.get('/', function(req, resp, next) {
//   resp.json({ success: true });
// });
router.post('/signin', signin);
router.get('/users', passport.authenticate('jwt', { session: false }), adminRole, getAllUsers);
router.post('/users', passport.authenticate('jwt', { session: false }), adminRole, addUser);
router.delete('/users/:id',
  passport.authenticate('jwt',
  { session: false }),
  adminRole,
  removeUser);
router.get('/roles', passport.authenticate('jwt', { session: false }), adminRole, getAllRoles);

export default router;
