import express from 'express';
import { signin, signout } from './auth';
import passport from 'passport';
import passportJwt from '../passportStrategies/passport';
const router = express.Router();

passportJwt(passport);

router.get('/', function(req, resp, next) {
  resp.json({ success: true });
});
router.post('/signin', signin);

export default router;
