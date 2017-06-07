export function up(knex) {
    return knex.schema.createTableIfNotExists('chat', table => {
        table.increments().primary();
        table.bigInteger('sender_id').unsigned().index().references('id').inTable('users');
        table.bigInteger('session_id').unsigned().index().references('id').inTable('sessions');
        table.text('message');
        table.timestamp('sent_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema.dropTable('chat');
}
