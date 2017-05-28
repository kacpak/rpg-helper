import express from 'express';
import Session from '../db/models/session';
import { authenticate } from '../auth';

const router = express.Router();

router.get('/sessions', authenticate(), async (req, res) => {
    const userSessions = await req.user.related('sessions').fetch();
    res.json(userSessions);
});

router.post('/sessions', authenticate(), async (req, res) => {
    const session = await Session.create({ name: req.body.name, description: req.body.description, active: 1 });
    await req.user.sessions().attach(session);
    res.json(session);
});


export default router;
