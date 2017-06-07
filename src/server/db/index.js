import knex from 'knex';
import {Model} from 'objection';
import {getLogger} from '../config/logger';

const logger = getLogger('DATABASE');

import * as config from './config';

const Knex = knex(config[process.env.NODE_ENV || 'development']);
Model.knex(Knex);

export async function migrate() {
    try {
        logger.info('Migrating database...');
        await Knex.migrate.latest();
        logger.info('Migrating database completed.');

        if (process.env.NODE_ENV === 'development') {
            logger.info('Seeding demo database data...');
            await Knex.seed.run();
            logger.info('Seeding demo database data completed.');
        }
    } catch (err) {
        logger.error(`${err.name}: ${err.message}`);
        logger.debug(err);
        throw err;
    }
}
