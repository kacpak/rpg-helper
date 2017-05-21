import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express from 'express';
import historyApiFallback from 'express-history-api-fallback';
import https from 'https';
import morgan from 'morgan';
import session from 'express-session';
import ConnectSQLite from 'connect-sqlite3';

import paths from './paths';
import * as auth from './server/authentication';
import * as db from './server/db';
import * as sockets from './server/sockets';
import { credentials } from './ssl';
import webpackDevMiddlewareInit from './webpack-dev-middleware';

const app = express();
async function initialize() {
    await db.init();

    const SQLiteStore = new ConnectSQLite(session);
    const sessionOptions = {
        store: new SQLiteStore({dir: paths.database}),
        key: 'express.sid',
        secret: process.env.SECRET || 'secret',
        secure: true,
        resave: false,
        saveUninitialized: false
    };

    app.use(morgan('short'));
    app.use(bodyParser.json());
    app.use(session(sessionOptions));

    auth.init(app);
    app.use('/auth', auth.router);

    if (process.env.NODE_ENV === 'development') {
        webpackDevMiddlewareInit(app);
    } else {
        app.use('/', express.static(paths.public));
        app.use(historyApiFallback('index.html', { root: paths.public }));
    }

    const httpsServer = https.createServer(credentials, app);
    sockets.init(httpsServer, sessionOptions);

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
