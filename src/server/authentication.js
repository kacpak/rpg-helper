import express from 'express';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import Users from './db/users';

export function init(app) {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await Users.findById(id);
        done(null, user);
    });
    passport.use(new BasicStrategy(async (username, password, done) => {
        const user = await Users.findByLogin(username);
        if (user && user.password === password) {
            return done(null, user);
        }
        return done(null, false);
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

const authenticate = () => passport.authenticate('basic');
export const router = express.Router();

router.post('/login', authenticate(), (req, res) => {
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
