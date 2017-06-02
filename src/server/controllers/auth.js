import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/models/user';
import { authenticate } from '../auth';
import { getLogger } from '../logger';

const logger = getLogger('AUTH');

const router = express.Router();

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
            logger.info(`User logged in: ${req.body.login}`);
            return res.json({user, token});
        }
    } catch (err) {
        // 401
    }
    logger.error(`User login rejected: ${req.body.login}`);
    return res.sendStatus(401);
});

router.get('/me', authenticate(), (req, res) => res.json(req.user));

router.get('/logout', authenticate(), (req, res) => {
    logger.info(`User logged out: ${req.user.attributes.login}`);
    req.logout();
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    try {
        await User.create({
            login: req.body.login,
            password: await bcrypt.hash(req.body.password, 10)
        });
        logger.info(`New user registered: ${req.body.login}`);
        res.sendStatus(200);
    } catch (e) {
        logger.info(`New user registration failure: ${req.body.login}`);
        res.status(403).send(e);
    }
});

export default router;
