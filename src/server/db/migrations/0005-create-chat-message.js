export function up(knex) {
    return knex.schema.createTableIfNotExists('chat_message', table => {
        table.bigIncrements();
        table.bigInteger('user_id').unsigned().index().references('id').inTable('user');
        table.bigInteger('character_id').unsigned().index().references('id').inTable('character');
        table.bigInteger('session_id').unsigned().index().references('id').inTable('session');
        table.text('message').notNullable();
        table.timestamp('sent_at').notNullable();
    });
}

export function down(knex) {
    return knex.schema.dropTable('chat');
}
