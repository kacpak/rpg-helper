import path from 'path';
import paths from '../paths';

const base = {
    client: 'sqlite3',
    migrations: {
        directory: path.join(__dirname, 'migrations')
    },
    seeds: {
        directory: path.join(__dirname, 'seeds')
    }
};

export const development = Object.assign({}, base, {
    connection: {
        filename: path.join(paths.database, 'dev.sqlite3')
    }
});

export const production = Object.assign({}, base, {
    connection: {
        filename: path.join(paths.database, 'database.sqlite3')
    }
});
