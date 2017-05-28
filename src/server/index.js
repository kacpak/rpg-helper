import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express from 'express';
import historyApiFallback from 'express-history-api-fallback';
import https from 'https';
import morgan from 'morgan';

import paths from './paths';
import * as auth from './auth/index';
import * as db from './db/index';
import * as sockets from './sockets/index';
import { credentials } from './config/ssl';
import webpackDevMiddlewareInit from './config/webpack-dev-middleware';

const app = express();
async function initialize() {
    await db.migrate();

    app.use(morgan('short'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    auth.init(app);
    app.use('/auth', auth.router);

    if (process.env.NODE_ENV === 'development') {
        webpackDevMiddlewareInit(app);
    } else {
        app.use('/', express.static(paths.public));
        app.use(historyApiFallback('index.html', { root: paths.public }));
    }

    const httpsServer = https.createServer(credentials, app);
    sockets.init(httpsServer);

    httpsServer.listen(process.env.PORT)
        .on('error', function (err) {
            if (err.syscall !== 'listen') {
                throw err;
            }

            switch (err.code) {
                case 'EACCES':
                    console.error(`Setting up this server requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`Port ${err.port} is already in use`);
                    process.exit(2);
                    break;
                default:
                    throw err;
            }
        })
        .on('listening', function () {
            const port = this.address().port;
            console.log(`Listening on *:${port}.`);

            if (process.env.NODE_ENV === 'development') {
                console.log(`Open up https://localhost:${port}/ in your browser.`);
            }
        });
}

Promise.resolve()
    .then(initialize)
    .catch(e => console.error(e));
