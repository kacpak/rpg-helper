import path from 'path';
import morgan from 'morgan';
import split from 'split';
import winston from 'winston';
import paths from './paths';

const consoleLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export default function (app) {
    winston.configure({
        transports: [
            new (winston.transports.File)({
                level: 'debug',
                filename: path.join(paths.dist, 'rpg-helper.log'),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new (winston.transports.Console)({
                level: consoleLevel,
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });

    const winstonStream = split().on('data', line => winston.info(line));

    app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms', {
        stream: winstonStream
    }));
}

export function getLogger(name) {
    if (winston.loggers[name]) {
        return winston.loggers.get(name);
    }

    return winston.loggers.add(name, {
        console: {
            label: name,
            level: consoleLevel,
            handleExceptions: true,
            json: false,
            colorize: true
        },
    });
}
