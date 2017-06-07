import express from 'express';
import Session from '../db/models/session';
import { authenticate } from '../auth';
import { getLogger } from '../logger';

const logger = getLogger('SESSION');

const router = express.Router();

router.get('/sessions', authenticate(), async (req, res) => {
    const userSessions = await req.user.$relatedQuery('sessions');
    res.json(userSessions);
});

router.post('/sessions', authenticate(), async (req, res) => {
    const session = await Session.create({ name: req.body.name, description: req.body.description, active: 1 });
    await req.user.sessions().attach(session);
    logger.info(`New session created by ${req.user.attributes.login} - ${session.attributes.id}:${session.attributes.name}`);
    res.json(session);
});


export default router;
