import express from 'express';
import { signin, signup } from './auth';
import { adminRole } from '../middlewares/checkRole';
import { getAllUsers, addUser, removeUser, updateUser } from './users';
import { getAllRoles } from './roles';
import { getTasks, addTask, removeTask, updateTask } from './tasks';
import { getParticipants } from './participants';
import passport from 'passport';
import passportJwt from '../passportStrategies/passport';
const router = express.Router();

passportJwt(passport);

// router.get('/', function(req, resp, next) {
//   resp.json({ success: true });
// });
router.post('/signin', signin);
router.post('/signup', signup);

router.get('/users', passport.authenticate('jwt', { session: false }), adminRole, getAllUsers);
router.post('/users', passport.authenticate('jwt', { session: false }), adminRole, addUser);
router.delete('/users/:id',
  passport.authenticate('jwt', { session: false }),
  adminRole,
  removeUser);
router.put('/users/:id', passport.authenticate('jwt', { session: false }), adminRole, updateUser);

router.get('/roles', passport.authenticate('jwt', { session: false }), adminRole, getAllRoles);

router.get('/tasks', passport.authenticate('jwt', { session: false }), adminRole, getTasks);
router.post('/tasks', passport.authenticate('jwt', { session: false }), adminRole, addTask);
router.delete('/tasks/:id',
  passport.authenticate('jwt', { session: false }),
  adminRole,
  removeTask);
router.put('/tasks/:id', passport.authenticate('jwt', { session: false }), adminRole, updateTask);

router.get('/participants',
  passport.authenticate('jwt', { session: false }),
  adminRole,
  getParticipants
);

export default router;
