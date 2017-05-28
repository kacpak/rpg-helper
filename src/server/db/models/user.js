import Bookshelf from '../index';

export default class User extends Bookshelf.Model {
    get tableName() { return 'users'; }
    get hasTimestamps() { return true; }

    async findByLogin(login) {
        return await this.findOne({ login });
    }
}
