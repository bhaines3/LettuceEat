//code from jwt documentation: https://www.npmjs.com/package/passport-jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const db = require("../../models");
//secret code for generating the jwt
const settings = require('./settings'); 

module.exports = function(passport) {
  //options to control how the token is extracted from request or verified  
  var opts = {};
  
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = settings.secret;
   //jwt authetication JwtStrategy()
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    db.User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};