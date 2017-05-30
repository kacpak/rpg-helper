import knex from 'knex';
import {Model} from 'objection';

import * as config from './config';

const Knex = knex(config[process.env.NODE_ENV || 'development']);
Model.knex(Knex);

export async function migrate() {
    console.log('Migrating database...');
    await Knex.migrate.latest();
    console.log('Migrating database completed.');

    if (process.env.NODE_ENV === 'development') {
        console.log('Seeding demo database data...');
        await Knex.seed.run();
        console.log('Seeding demo database data completed.');
    }
}
