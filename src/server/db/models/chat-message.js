import Bookshelf from '../index';

class ChatMessage extends Bookshelf.Model {
    get tableName() { return 'chat'; }
    get hasTimestamps() { return false; }

    sender() {
        return this.belongsTo('User', 'sender_id');
    }

    session() {
        return this.belongsTo('Session', 'session_id');
    }
}


export default Bookshelf.model('ChatMessage', ChatMessage);
