import express from 'express';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { findUserByUsername, findUserById } from './db';

export function init(app) {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, findUserById(id)));
    passport.use(new BasicStrategy((username, password, done) => {
        const user = findUserByUsername(username);
        if (user && user.password === password) {
            return done(null, user);
        }
        return done(null, false);
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

const authenticate = () => passport.authenticate('basic');
const router = express.Router();

router.post('/login', authenticate(), (req, res) => {
    res.json(req.user);
});

export default router;
