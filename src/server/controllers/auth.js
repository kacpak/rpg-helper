import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/models/user';
import { authenticate } from '../auth';

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
            return res.json({user, token});
        }
    } catch (err) {
        // 401
    }
    return res.sendStatus(401);
});

router.get('/me', authenticate(), (req, res) => res.json(req.user));

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

export default router;
