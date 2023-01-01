import passport from 'passport';
import passportJwt from 'passport-jwt';
import User from '../models/user.model';
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

// passport.use(
//   new StrategyJwt(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'gssjwwugsdnksn',
//     },
//     function (jwtPayload, done) {
//       return User.findOne({ where: { id: jwtPayload.id } })
//         .then((user) => {
//           return done(null, user);
//         })
//         .catch((err) => {
//           return done(err);
//         });
//     }
//   )
// );