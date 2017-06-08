import bcrypt from 'bcrypt';

export async function seed(knex) {
    await knex('user').del();
    await knex('user').insert([
        { id: 1, login: 'kacpak', password: bcrypt.hashSync('pass', 10), created_at: knex.fn.now() },
        { id: 2, login: 'test', password: bcrypt.hashSync('pass', 10), created_at: knex.fn.now() },
    ]);
}
