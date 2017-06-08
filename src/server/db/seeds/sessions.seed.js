export async function seed(knex) {
    await knex('session').del();
    await knex('session').insert([
        { id: 1, name: 'Kamyk D&D', description: 'Wiekopomna sesja prowadzona przez Kamyka', is_active: 1, created_at: knex.fn.now() },
        { id: 2, name: 'DR D&D', description: 'Lochy Dominika', is_active: 1, created_at: knex.fn.now() },
        { id: 3, name: 'Naruto', description: 'Ninja w Lochach', is_active: 0, created_at: knex.fn.now() }
    ]);

    await knex('character_session_user').del();
    await knex('character_session_user').insert([
        { user_id: 1, session_id: 1, is_game_master: 1 },
        { user_id: 1, session_id: 2, is_game_master: 0 },
        { user_id: 1, session_id: 3, is_game_master: 1 },
        { user_id: 2, session_id: 2, is_game_master: 1 },
        { user_id: 2, session_id: 3, is_game_master: 0 },
    ]);
}
