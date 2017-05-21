import db from 'sqlite';

export default class User {
    static async findById(id) {
        return await db.get('SELECT * FROM Users WHERE id = ?', id);
    }

    static async findByLogin(login) {
        return await db.get('SELECT * FROM Users WHERE login = ?', login);
    }
}
