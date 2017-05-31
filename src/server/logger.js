import path from 'path';
import winston from 'winston';
import paths from './paths';

winston.loggers.options.transports = [
    new (winston.transports.File)({
        name: 'logger',
        filename: path.join(paths.dist, 'rpg-helper.log'),
        level: 'info'
    })
];

export function getLogger(name) {
    if (winston.loggers[name]) {
        return winston.loggers.get(name);
    }

    return winston.loggers.add(name, {
        console: {
            level: 'silly',
            colorize: true,
            label: name
        },
    });
}
