import bcrypt from 'bcrypt';

export async function seed(knex, Promise) {
    await knex('users').del();
    await knex('users').insert([
        {id: 1, login: 'kacpak', password: bcrypt.hashSync('pass', 10)},
        {id: 2, login: 'test', password: bcrypt.hashSync('pass', 10) },
    ]);
}
