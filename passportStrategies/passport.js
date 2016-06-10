import passport from 'passport-jwt';
import config from '../config';
import User from '../models/user';

let JwtStrategy = passport.Strategy;

function init(passport) {
  
  function jwtFromRequest(req) {
    let token = null;
    
    if(req && req.cookies) {
      token = req.cookies['jwt'];
    }    
    return token;
  }
  
  let options = {
    jwtFromRequest,
    secretOrKey: config.jwtSecret
  }
  
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      
      if (user) {
        return done(null, user);
      }
      
      done(null, false);
    });
  }));
}

export default init;