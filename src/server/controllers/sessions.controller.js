import express from 'express';
import { createSessionForUser } from '../db/models/session.model';
import { authenticate } from '../config/auth';
import { getLogger } from '../config/logger';

const logger = getLogger('SESSION');

const router = express.Router();

router.get('/sessions', authenticate(), async (req, res) => {
    const userSessions = await req.user.$relatedQuery('sessions');
    res.json(userSessions);
});

router.post('/sessions', authenticate(), async (req, res) => {
    try {
        const session = await createSessionForUser(req.user, {
            name: req.body.name,
            description: req.body.description
        });
        logger.info(`New session created by ${req.user.login} - ${session.id}:${session.name}`);
        res.json(session);
    } catch (err) {
        logger.error(`New session creation failure '${req.body.name}' for user '${req.user.login}'`);
        logger.debug(err);
        res.sendStatus(500);
    }
});


export default router;
