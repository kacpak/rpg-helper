export function up(knex) {
    return knex.schema.createTableIfNotExists('user', table => {
        table.bigIncrements();
        table.string('login').unique();
        table.string('password');
        table.timestamps();
    });
}

export function down(knex) {
    return knex.schema.dropTable('user');
}
