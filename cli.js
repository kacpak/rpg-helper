#!/usr/bin/env node
const process = require('process');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .usage('Usage: rpg-helper <command> [options]')
    .command('start', 'start RPG Helper', {}, start)
    .command('*', 'show help', {}, defaultCommand)
    .option('ssl-dir', {
        alias: 'ssl',
        description: 'directory with ssl certificate',
        type: 'string',
        group: 'start',
        requiresArg: true,
        normalize: true,
        coerce: path.resolve
    })
    .option('database-dir', {
        alias: 'db',
        description: 'directory for storing database files',
        type: 'string',
        group: 'start',
        requiresArg: true,
        normalize: true,
        coerce: path.resolve
    })
    .option('secret', {
        alias: 's',
        description: 'long secret string for encryption purposes',
        type: 'string',
        group: 'start',
        requiresArg: true,
        demandOption: true
    })
    .option('port', {
        alias: 'p',
        description: 'port on which server will be available',
        type: 'number',
        group: 'start',
        requiresArg: true,
        default: 443
    })
    .example('rpg-helper start --db=./path/to/dir --ssl=./path/to/dir', 'start RPG Helper storing database in the given directory, with provided certificates')
    .version()
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .epilog('Copyright © 2017 Mateusz Kasprzak')
    .showHelpOnFail(false, 'Specify --help for available options')
    .wrap(yargs.terminalWidth())
    .argv;

function start(argv) {
    populateEnv('NODE_ENV', 'production');
    populateEnv('DATABASE_DIR', argv.databaseDir);
    populateEnv('SSL_CERT_DIR', argv.sslDir);
    populateEnv('PORT', argv.port);
    populateEnv('SECRET', argv.secret);

    const libPath = path.join(__dirname, 'dist', 'server', 'server.js');
    const startServer = require(libPath).start;

    startServer()
        .catch(e => console.error(e));
}

function defaultCommand() {
    console.log('Use --help for help.');
}

function populateEnv(key, value) {
    if (value) {
        process.env[key] = value;
    }
}
