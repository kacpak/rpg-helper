export function up(knex, Promise) {
    return knex.schema.createTableIfNotExists('sessions', table => {
        table.increments().primary();
        table.string('name');
        table.text('description');
        table.boolean('active').defaultTo(true);
        table.timestamps();
    });
}

export function down(knex, Promise) {
    return knex.schema.dropTable('sessions');
}
