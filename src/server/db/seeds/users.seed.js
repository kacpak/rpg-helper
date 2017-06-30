import { getHashedPassword } from '../../config/auth';

export async function seed(knex) {
    const users = await knex('user').count('id as count').first();
    if (users.count) {
        return;
    }
    await knex('user').insert([
        { id: 1, login: 'kacpak', password: getHashedPassword('pass'), created_at: knex.fn.now() },
        { id: 2, login: 'test', password: getHashedPassword('pass'), created_at: knex.fn.now() },
        { id: 3, login: 'test2', password: getHashedPassword('pass'), created_at: knex.fn.now() },
    ]);
}
