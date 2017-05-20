import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import webpackDevMiddlewareInit from './webpack-dev-middleware';
import api from './server/api-router';

const app = express();
app.use(morgan('short'));
app.use('/api', api);

if (process.env.NODE_ENV === 'development') {
    webpackDevMiddlewareInit(app);
} else {
    app.use('/', express.static(path.resolve(__dirname, 'public')));
}

app.listen(process.env.PORT)
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
        console.log(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    });
