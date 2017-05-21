import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express from 'express';
import https from 'https';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import webpackDevMiddlewareInit from './webpack-dev-middleware';
import authRouter, {init as authInit} from './server/authentication';
import { credentials } from './ssl';

const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    secure: true,
    resave: false,
    saveUninitialized: false
}));
authInit(app);
app.use('/auth', authRouter);

if (process.env.NODE_ENV === 'development') {
    webpackDevMiddlewareInit(app);
} else {
    app.use('/', express.static(path.resolve(__dirname, 'public')));
}

const httpsServer = https.createServer(credentials, app);
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
        console.log(`==> Listening on port ${port}. Open up https://localhost:${port}/ in your browser.`);
    });
