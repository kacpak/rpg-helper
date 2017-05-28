import Bookshelf from '../index';

class User extends Bookshelf.Model {
    get tableName() { return 'users'; }
    get hasTimestamps() { return true; }
    get hidden() { return ['password']; }

    findByLogin(login) {
        return this.findOne({login});
    }

    sessions() {
        return this.belongsToMany('Session');
    }
}


export default Bookshelf.model('User', User);
