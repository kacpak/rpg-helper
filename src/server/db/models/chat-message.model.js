import path from 'path';
import {Model} from 'objection';

export default class ChatMessage extends Model {
    static tableName = 'chat';

    static relationMappings = {
        session: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'session.model'),
            join: {
                from: 'chat.session_id',
                to: 'sessions.id'
            }
        },
        sender: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'user.model'),
            join: {
                from: 'chat.sender_id',
                to: 'users.id'
            }
        }
    };
}
