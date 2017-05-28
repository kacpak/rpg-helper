export async function seed(knex, Promise) {
    await knex('sessions').del();
    await knex('sessions').insert([
        {id: 1, name: 'Kamyk D&D', description: 'Wiekopomna sesja prowadzona przez Kamyka', active: 1},
        {id: 2, name: 'DR D&D', description: 'Lochy Dominika', active: 1},
        {id: 3, name: 'Naruto', description: 'Ninja w Lochach', active: 0}
    ]);

    await knex('sessions_users').del();
    await knex('sessions_users').insert([
        {id: 1, user_id: 1, session_id: 1 },
        {id: 2, user_id: 1, session_id: 2 },
        {id: 3, user_id: 1, session_id: 3 },
        {id: 4, user_id: 2, session_id: 3 },
        {id: 5, user_id: 2, session_id: 2 },
    ]);
}
