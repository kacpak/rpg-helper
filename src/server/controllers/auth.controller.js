import bcrypt from 'bcrypt-nodejs';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.model';
import { authenticate, getHashedPassword } from '../config/auth';
import { getLogger } from '../config/logger';

const logger = getLogger('AUTH');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByLogin(req.body.login);
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.SECRET,
                { expiresIn: 6 * 60 * 60 }
            );
            logger.info(`User logged in: ${req.body.login}`);
            return res.json({user, token});
        }
    } catch (err) {
        logger.debug(err);
    }
    logger.error(`User login rejected: ${req.body.login}`);
    return res.sendStatus(401);
});

router.get('/me', authenticate(), (req, res) => res.json(req.user));

router.get('/logout', authenticate(), (req, res) => {
    logger.info(`User logged out: ${req.user.login}`);
    req.logout();
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    try {
        await User.query().insert({
            login: req.body.login,
            password: getHashedPassword(req.body.password)
        });
        logger.info(`New user registered: ${req.body.login}`);
        res.sendStatus(200);
    } catch (e) {
        logger.error(`New user registration failure: ${req.body.login}`);
        logger.debug(e);
        res.status(403).send(e);
    }
});

export default router;
