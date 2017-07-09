export function up(knex) {
    return knex.schema.createTableIfNotExists('character', table => {
        table.bigIncrements();
        table.string('name').notNullable();
        table.string('race').notNullable();
        table.string('character').notNullable();
        table.string('deity').notNullable();
        table.string('size').notNullable();
        table.string('age').notNullable();
        table.string('sex').notNullable();
        table.string('height').notNullable();
        table.string('weight').notNullable();
        table.string('eyes').notNullable();
        table.string('hair').notNullable();
        table.string('skin').notNullable();
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
