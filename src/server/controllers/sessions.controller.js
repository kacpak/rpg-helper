import express from 'express';
import { authenticate } from '../config/auth';
import { getLogger } from '../config/logger';
import User from '../db/models/user.model';

const logger = getLogger('SESSION');

const router = express.Router();

router.get('/sessions', authenticate(), async (req, res) => {
    const userSessions = await req.user.$relatedQuery('sessions');
    res.json(userSessions);
});

router.get('/sessions/:id', authenticate(), async (req, res) => {
    try {
        const session = await (req.query.detailed
            ? req.user.findSession(req.params.id).eager('[user, character]')
            : req.user.findSession(req.params.id));

        res.json(session);
    } catch (err) {
        logger.error(`Couldn't find session id ${req.params.id}`);
        logger.debug(err);
        res.sendStatus(400);
    }
});

router.post('/sessions/:id/invite', authenticate(), async (req, res) => {
    try {
        const userSession = await req.user.findSession(req.params.id);
        if (!userSession.is_game_master) {
            throw 'Only Game Master can invite users to session';
        }

        const user = await User.findByLogin(req.body.login);
        res.json(await user.joinSession(req.params.id));
    } catch (err) {
        logger.error(`Inviting user ${req.body.login} to session id ${req.params.id} failed.`);
        logger.debug(err);
        res.status(400).send(err);
    }
});

router.post('/sessions', authenticate(), async (req, res) => {
    try {
        const session = await req.user.createSession({
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
