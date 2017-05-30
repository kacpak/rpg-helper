import Bookshelf from '../index';

class Session extends Bookshelf.Model {
    get tableName() { return 'sessions'; }
    get hasTimestamps() { return true; }

    users() {
        return this.belongsToMany('User');
    }

    chatMessages() {
        return this.hasMany('ChatMessage');
    }
}


export default Bookshelf.model('Session', Session);
