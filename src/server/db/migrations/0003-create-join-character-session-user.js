export function up(knex) {
    return knex.schema.createTableIfNotExists('character_session_user', table => {
        table.integer('user_id').references('user.id').notNullable();
        table.integer('session_id').references('session.id').notNullable();
        table.integer('character_id').references('character.id').nullable();
        table.boolean('is_game_master').notNullable();
        table.primary(['user_id', 'session_id']);
    });
}

export function down(knex) {
    return knex.schema.dropTable('character_session_user');
}
