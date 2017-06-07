import path from 'path';
import omit from 'lodash.omit';
import {Model} from 'objection';

export default class User extends Model {
    static tableName = 'users';

    static get $secureFields() {
        return ['password'];
    }

    static relationMappings = {
        sessions: {
            relation: Model.ManyToManyRelation,
            modelClass: path.join(__dirname, 'session.model'),
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

    $formatJson(json, options) {
        json = super.$formatJson(json, options);
        return omit(json, User.$secureFields);
    }
}

export function getUserById(id) {
    return User.query().where('id', id).first();
}

export function getUserByLogin(login) {
    return User.query().where('login', login).first();
}

export function insertUser(user) {
    const newUser = Object.assign({ created_at: Date.now() }, user);
    return User.query().insert(newUser);
}
