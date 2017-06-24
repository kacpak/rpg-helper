import bcrypt from 'bcrypt';

export async function seed(knex) {
    const users = await knex('user').count('id as count').first();
    if (users.count) {
        return;
    }
    await knex('user').insert([
        { id: 1, login: 'kacpak', password: bcrypt.hashSync('pass', 10), created_at: knex.fn.now() },
        { id: 2, login: 'test', password: bcrypt.hashSync('pass', 10), created_at: knex.fn.now() },
        { id: 3, login: 'test2', password: bcrypt.hashSync('pass', 10), created_at: knex.fn.now() },
    ]);
}
