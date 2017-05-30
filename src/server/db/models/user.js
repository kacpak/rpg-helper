import {Model} from 'objection';
import Session from './session';
import omit from 'lodash.omit';

export default class User extends Model {
    static tableName = 'users';

    static $secureFields = ['password'];

    static relationMappings = {
        sessions: {
            relation: Model.ManyToManyRelation,
            modelClass: Session,
            join: {
                from: 'users.id',
                through: {
                    from: 'sessions_users.user_id',
                    to: 'sessions_users.session_id'
                },
                to: 'sessions.id'
            }
        }
    };

    static $formatJson(json, options) {
        json = super.$formatJson(json, options);
        return omit(json, this.$secureFields);
    }
}
