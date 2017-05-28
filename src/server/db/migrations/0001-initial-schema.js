export function up(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', table => {
        table.increments();
        table.string('login');
        table.string('password');
        table.timestamps();
    });
}

export function down(knex, Promise) {
    return knex.schema.dropTable('users');
}
