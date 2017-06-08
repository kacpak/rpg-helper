import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import historyApiFallback from 'express-history-api-fallback';
import http from 'http';
import spdy from 'spdy';

import paths from './config/paths';
import * as auth from './config/auth';
import * as db from './db/index';
import * as sockets from './sockets/index';
import authController from './controllers/auth.controller';
import sessionsController from './controllers/sessions.controller';
import { credentials } from './config/ssl';
import initLogger, {getLogger} from './config/logger';

const logger = getLogger('MAIN');

export async function start() {
    const app = express();
    initLogger(app);

    try {
        await db.migrate();
    } catch (err) {
        process.exit(1);
    }

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    auth.init(app);
    app.use('/auth', authController);
    app.use('/api', sessionsController);

    if (process.env.NODE_ENV === 'development') {
        const { default: webpackDevMiddlewareInit } = await import('./config/webpack-dev-middleware');
        webpackDevMiddlewareInit(app);
    } else {
        app.use('/', express.static(paths.public));
        app.use(historyApiFallback('index.html', { root: paths.public }));
    }

    const httpsServer = process.env.FORCE_HTTP
        ? http.createServer(app)
        : spdy.createServer(credentials, app);
    sockets.init(httpsServer);

    httpsServer.listen(process.env.PORT)
        .on('error', function (err) {
            if (err.syscall !== 'listen') {
                throw err;
            }

            switch (err.code) {
                case 'EACCES':
                    logger.error(`Setting up this server requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.error(`Port ${err.port} is already in use`);
                    process.exit(2);
                    break;
                default:
                    throw err;
            }
        })
        .on('listening', function () {
            const port = this.address().port;
            logger.info(`Listening on *:${port}.`);

            if (process.env.NODE_ENV === 'development') {
                logger.info(`Open up https://localhost:${port}/ in your browser.`);
            }
        });
}
