import passport from 'passport-jwt';
import config from '../config';
import User from '../models/user';

const JwtStrategy = passport.Strategy;
const ExtractJwt = passport.ExtractJwt;

function init(passport) {
  // function jwtFromRequest(req) {
  //   let token = null;
  //   if (req && req.cookies) {
  //     token = req.cookies['jwt'];
  //   }
  //   return token;
  // }

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.jwtSecret,
  };

  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id })
      .populate('role')
      .exec((err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      });
  }));
}

export default init;
