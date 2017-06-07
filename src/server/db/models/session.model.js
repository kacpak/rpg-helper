import path from 'path';
import {Model} from 'objection';

export default class Session extends Model {
    static tableName = 'sessions';

    static relationMappings = {
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: path.join(__dirname, 'user.model'),
            join: {
                from: 'sessions.id',
                through: {
                    from: 'sessions_users.session_id',
                    to: 'sessions_users.user_id'
                },
                to: 'users.id'
            }
        },
        chatMessages: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, 'chat-message.model'),
            join: {
                from: 'sessions.id',
                to: 'chat.session_id'
            }
        }
    };
}

export function createSessionForUser(user, session) {
    const newSession = Object.assign({ created_at: Date.now(), active: 1 }, session);
    return user
        .$relatedQuery('sessions')
        .insert(newSession);
}
