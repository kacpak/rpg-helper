export async function seed(knex) {
    await knex('character').del();
    await knex('character').insert([
        {
            id: 1,
            name: 'Drenthor',
            created_at: new Date().toISOString(),
            hit_points: 10,
            status: 1,
            experience: 200,
            strength: 5,
            constitution: 2,
            dexterity: 10,
            intelligence: 5,
            wisdom: 2,
            charisma: 13
        }
    ]);
}
