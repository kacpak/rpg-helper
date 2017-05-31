import knex from 'knex';
import bookshelf from 'bookshelf';
import {pluggable as ModelBase} from 'bookshelf-modelbase';
import {getLogger} from '../logger';

const logger = getLogger('DATABASE');

import * as config from './config';

const Knex = knex(config[process.env.NODE_ENV || 'development']);
const Bookshelf = bookshelf(Knex);
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
Bookshelf.plugin(ModelBase);

export async function migrate() {
    logger.info('Migrating database...');
    await Knex.migrate.latest();
    logger.info('Migrating database completed.');

    if (process.env.NODE_ENV === 'development') {
        logger.info('Seeding demo database data...');
        await Knex.seed.run();
        logger.info('Seeding demo database data completed.');
    }
}

export default Bookshelf;
