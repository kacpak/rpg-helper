import {Model} from 'objection';
import User from './user';

export default class Session extends Model {
    static tableName = 'sessions';

    static relationMappings = {
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: User,
            join: {
                from: 'sessions.id',
                through: {
                    from: 'sessions_users.session_id',
                    to: 'sessions_users.user_id'
                },
                to: 'users.id'
            }
        }
    }
}
