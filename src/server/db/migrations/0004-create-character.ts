export function up(knex) {
    return knex.schema.createTableIfNotExists('character', table => {
        table.bigIncrements();
        table.string('name').notNullable();
        table.bigInteger('experience').notNullable();
        table.integer('status').notNullable();
        table.integer('hit_points').notNullable();
        table.integer('strength').notNullable();
        table.integer('constitution').notNullable();
        table.integer('dexterity').notNullable();
        table.integer('intelligence').notNullable();
        table.integer('wisdom').notNullable();
        table.integer('charisma').notNullable();
        table.timestamps();
    });
}

export function down(knex) {
    return knex.schema.dropTable('character');
}
