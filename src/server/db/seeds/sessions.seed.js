export async function seed(knex) {
    await knex('session').del();
    await knex('session').insert([
        { id: 1, name: 'Great Session', description: 'kacpak GM', is_active: 1, created_at: new Date().toISOString() },
        { id: 2, name: 'Test with characters', description: 'test GM', is_active: 1, created_at: new Date().toISOString() },
        { id: 3, name: 'Old one', description: 'kacpak GM', is_active: 0, created_at: new Date().toISOString() },
        { id: 4, name: 'Test empty', description: 'test GM', is_active: 1, created_at: new Date().toISOString() }
    ]);

    await knex('character_session_user').del();
    await knex('character_session_user').insert([
        { user_id: 1, session_id: 1, is_game_master: 1 },
        { user_id: 1, session_id: 2, is_game_master: 0, character_id: 1 },
        { user_id: 1, session_id: 3, is_game_master: 1 },
        { user_id: 1, session_id: 4, is_game_master: 0 },
        { user_id: 2, session_id: 2, is_game_master: 1 },
        { user_id: 2, session_id: 3, is_game_master: 0 },
        { user_id: 2, session_id: 4, is_game_master: 1 },
    ]);
}
