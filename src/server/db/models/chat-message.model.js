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
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'user.model'),
            join: {
                from: 'chat_message.user_id',
                to: 'user.id'
            }
        }
    };

    static jsonSchema = {
        type: 'object',
        required: ['user_id', 'session_id', 'message'],

        properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            character_id: { type: ['null', 'integer'] },
            session_id: { type: 'integer' },
            message: { type: 'string', minLength: 1 },
            sent_at: { type: 'string' },
        }
    };

    static insertAndFetchEssentials(message) {
        return ChatMessage.query().insertAndFetch(message).eager('user(essentials).character(essentials, me)', {
            me: builder => builder.where('character_session_user.user_id', message.user_id)
        });
    }

    $beforeInsert() {
        this.sent_at = new Date().toISOString();
    }
}
