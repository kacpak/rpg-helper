import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import jwt from 'jsonwebtoken';
import Users from '../db/users';

export function init(app) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.SECRET
    };

    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await Users.findById(jwtPayload.id);
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

const authenticate = () => passport.authenticate('jwt', { session: false });
export const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findByLogin(req.body.login);
        if (req.body.password === user.password) {
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.SECRET,
                { expiresIn: 6 * 60 * 60 }
            );
            return res.json({user, token});
        }
    } catch (err) {
        // 401
    }
    return res.sendStatus(401);
});

router.get('/me', authenticate(), (req, res) => {
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    try {
        await Users.insertNewUser(req.body.login, req.body.password);
        res.sendStatus(200);
    } catch (e) {
        res.status(403).send(e);
    }
});
