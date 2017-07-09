export async function seed(knex) {
    const characters = await knex('character').count('id as count').first();
    if (characters.count) {
        return;
    }
    await knex('character').insert([
        {
            id: 1,
            name: 'Drenthor',
            created_at: new Date().toISOString(),
            race: 'Human',
            character: 'Chaotic Neutral',
            deity: 'Elune',
            size: 'Medium',
            age: 'Young Adult',
            sex: 'Male',
            height: 'Tall',
            weight: 'Average',
            eyes: 'Brown',
            hair: 'Black',
            skin: 'Light',
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
