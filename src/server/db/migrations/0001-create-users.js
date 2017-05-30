export function up(knex) {
    return knex.schema.createTableIfNotExists('users', table => {
        table.increments().primary();
        table.string('login').unique();
        table.string('password');
        table.timestamps();
    });
}

export function down(knex) {
    return knex.schema.dropTable('users');
}
