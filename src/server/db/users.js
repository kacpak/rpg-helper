import db from 'sqlite';

export default class User {
    static async findById(id) {
        return await db.get('SELECT * FROM Users WHERE id = ?', id);
    }

    static async findByLogin(login) {
        return await db.get('SELECT * FROM Users WHERE login = ?', login);
    }

    static async insertNewUser(login, password) {
        return await await db.run(`INSERT INTO Users (id, login, password) VALUES(NULL, ?, ?)`, login, password);
    }
}
