export function up(knex) {
    return knex.schema.createTableIfNotExists('user', table => {
        table.bigIncrements();
        table.string('login').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps();
    });
}

export function down(knex) {
    return knex.schema.dropTable('user');
}
