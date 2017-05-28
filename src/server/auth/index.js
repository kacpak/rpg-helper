import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../db/models/user';

export function init(app) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.SECRET
    };

    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id);
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
        const user = await User.findOne({ login: req.body.login });
        if (await bcrypt.compare(req.body.password, user.attributes.password)) {
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.SECRET,
                { expiresIn: 6 * 60 * 60 }
            );
            delete user.password;
            return res.json({user, token});
        }
    } catch (err) {
        // 401
    }
    return res.sendStatus(401);
});

router.get('/me', authenticate(), (req, res) => {
    delete req.user.password;
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    try {
        await User.create({
            login: req.body.login,
            password: await bcrypt.hash(req.body.password, 10)
        });
        res.sendStatus(200);
    } catch (e) {
        res.status(403).send(e);
    }
});
