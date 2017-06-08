import path from 'path';
import Model from './_timestamped.model';

export default class Session extends Model {
    static tableName = 'session';

    static relationMappings = {
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: path.join(__dirname, 'user.model'),
            join: {
                from: 'session.id',
                through: {
                    from: 'character_session_user.session_id',
                    to: 'character_session_user.user_id'
                },
                to: 'user.id'
            }
        },
        chatMessages: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, 'chat-message.model'),
            join: {
                from: 'session.id',
                to: 'chat_message.session_id'
            }
        }
    };
}

export function createSessionForUser(user, session) {
    const newSession = Object.assign({ is_active: 1, is_game_master: 1 }, session);
    return user
        .$relatedQuery('sessions')
        .insertGraph(newSession);
}
