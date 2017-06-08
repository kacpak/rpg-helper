export function up(knex) {
    return knex.schema.createTableIfNotExists('session', table => {
        table.bigIncrements();
        table.string('name');
        table.text('description');
        table.boolean('is_active').defaultTo(true);
        table.timestamps();
    });
}

export function down(knex) {
    return knex.schema.dropTable('session');
}
