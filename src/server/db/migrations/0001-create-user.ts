import * as Knex from 'knex';

export function up(knex: Knex) {
    return knex.schema.createTableIfNotExists('user', table => {
        table.bigIncrements();
        table.string('login').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps();
    });
}

export function down(knex: Knex) {
    return knex.schema.dropTable('user');
}
