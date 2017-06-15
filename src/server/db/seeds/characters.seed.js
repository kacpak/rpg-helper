export async function seed(knex) {
    await knex('character').del();
    await knex('character').insert([
        { id: 1, name: 'Drenthor', created_at: new Date().toISOString() },
    ]);
}
