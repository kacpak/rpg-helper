import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from './db/models/user';

export function init(app) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.SECRET
    };

    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = (await User.query().where('id', '=', jwtPayload.id))[0];
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch(err) {
            return done(err, false);
        }
    }));
    app.use(passport.initialize());
}

export const authenticate = () => passport.authenticate('jwt', { session: false });
