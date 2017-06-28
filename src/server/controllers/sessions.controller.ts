import * as express from 'express';
import {authenticate, AuthenticatedRequest} from '../config/auth';
import { getLogger } from '../config/logger';
import User from '../db/models/user.model';

const logger = getLogger('SESSION');

const router = express.Router();

router.get('/sessions', authenticate(), async (req: AuthenticatedRequest, res: Response) => {
    const userSessions = await req.user.$relatedQuery('sessions');
    res.json(userSessions);
});

router.get('/sessions/:id', authenticate(), async (req: AuthenticatedRequest, res: Response) => {
    try {
        const session = await (req.query.detailed
            ? req.user.findSessionWithDetails(req.params.id)
            : req.user.findSession(req.params.id));

        res.json(session);
    } catch (err) {
        logger.error(`Couldn't find session id ${req.params.id}`);
        logger.debug(err);
        res.sendStatus(400);
    }
});

router.post('/sessions/:id/invite', authenticate(), sessionGameMaster, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findByLogin(req.body.login);
        res.json(await user.joinSession(req.params.id));
    } catch (err) {
        logger.error(`Inviting user ${req.body.login} to session id ${req.params.id} failed.`);
        logger.debug(err);
        res.status(500).send(err);
    }
});

router.post('/sessions/:id/details', authenticate(), sessionGameMaster, async (req, res) => {
    try {
        const session = await req.userSession.editDetails(req.body.details);
        res.json(session);

    } catch (err) {
        logger.error(`Editing session details of session id ${req.params.id} by user ${req.body.login} failed.`);
        logger.debug(err);
        res.status(500).send(err);
    }
});

router.delete('/sessions/:id/details', authenticate(), sessionGameMaster, async (req, res) => {
    try {
        const session = await req.userSession.finish();
        res.json(session);

    } catch (err) {
        logger.error(`Finishing session of id ${req.params.id} by user ${req.body.login} failed.`);
        logger.debug(err);
        res.status(500).send(err);
    }
});

router.post('/sessions/:id/details/resume', authenticate(), sessionGameMaster, async (req, res) => {
    try {
        const session = await req.userSession.resume();
        res.json(session);

    } catch (err) {
        logger.error(`Finishing session of id ${req.params.id} by user ${req.body.login} failed.`);
        logger.debug(err);
        res.status(500).send(err);
    }
});

router.post('/sessions/:id/character', authenticate(), async (req, res) => {
    try {
        const currentCharacter = await req.user.findCharacterBySessionId(req.params.id);
        if (currentCharacter) {
            res.status(400).json({
                error: true,
                message: `Character for user id ${req.user.id} and session id ${req.params.id} already exists!`
            });
        } else {
            const newCharacter = await req.user.createCharacter(req.params.id, req.body.character);
            res.json(newCharacter);
        }

    } catch (err) {
        logger.error(`Creating new character for session ${req.params.id} and user ${req.user.login} failed.`);
        logger.debug(err);
        res.status(500).send(err);
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

async function sessionGameMaster(req, res, next) {
    try {
        const userSession = await req.user.findSession(req.params.id);
        if (!userSession.is_game_master) {
            res.sendStatus(403);
            logger.error(`No game master permissions for user id ${req.user.id} and session id ${req.params.id}`);
            return next(new Error('Insufficient privileges'));
        }

        req.userSession = userSession;
        next();

    } catch(err) {
        logger.debug(err);
        res.sendStatus(500);
        next(err);
    }
}

export default router;
