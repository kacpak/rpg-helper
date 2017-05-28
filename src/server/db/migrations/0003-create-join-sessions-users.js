export function up(knex, Promise) {
    return knex.schema.createTableIfNotExists('sessions_users', table => {
        table.increments();
        table.integer('user_id').references('users.id');
        table.integer('session_id').references('sessions.id');
        table.timestamps();
    });
}

export function down(knex, Promise) {
    return knex.schema.dropTable('sessions_users');
}
