import knex from 'knex';
import bookshelf from 'bookshelf';
import {pluggable as ModelBase} from 'bookshelf-modelbase';

import * as config from './config';

const Knex = knex(config[process.env.NODE_ENV || 'development']);
const Bookshelf = bookshelf(Knex);
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
Bookshelf.plugin(ModelBase);

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

export default Bookshelf;
