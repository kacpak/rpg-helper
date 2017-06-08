export function up(knex) {
    return knex.schema.createTableIfNotExists('character', table => {
        table.bigIncrements();
        table.string('name');
        table.bigInteger('experience');
        table.integer('status');
        table.integer('hit_points');
        table.integer('strength');
        table.integer('constitution');
        table.integer('dexterity');
        table.integer('intelligence');
        table.integer('wisdom');
        table.integer('charisma');
        table.timestamps();
    });
}

export function down(knex) {
    return knex.schema.dropTable('character');
}
