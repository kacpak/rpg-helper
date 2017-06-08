import path from 'path';
import {Model} from 'objection';

export default class ChatMessage extends Model {
    static tableName = 'chat_message';

    static relationMappings = {
        session: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'session.model'),
            join: {
                from: 'chat_message.session_id',
                to: 'session.id'
            }
        },
        sender: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'user.model'),
            join: {
                from: 'chat_message.character_id',
                to: 'user.id'
            }
        }
    };

    $beforeInsert() {
        this.sent_at = new Date().toISOString();
    }
}
