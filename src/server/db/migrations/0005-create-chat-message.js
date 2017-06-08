export function up(knex) {
    return knex.schema.createTableIfNotExists('chat_message', table => {
        table.bigIncrements();
        table.bigInteger('character_id').unsigned().index().references('id').inTable('user'); // TODO when introducing characters link to `character` table
        table.bigInteger('session_id').unsigned().index().references('id').inTable('session');
        table.text('message');
        table.timestamp('sent_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema.dropTable('chat');
}
