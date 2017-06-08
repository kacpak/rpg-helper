import moment from 'moment';
import omit from 'lodash.omit';
import path from 'path';
import {Model} from 'objection';

export default class User extends Model {
    static tableName = 'user';

    static get $secureFields() {
        return ['password'];
    }

    static relationMappings = {
        sessions: {
            relation: Model.ManyToManyRelation,
            modelClass: path.join(__dirname, 'session.model'),
            join: {
                from: 'user.id',
                through: {
                    from: 'character_session_user.user_id',
                    to: 'character_session_user.session_id',
                    extra: ['is_game_master']
                },
                to: 'session.id'
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
    const newUser = Object.assign({ created_at: moment().format('YYYY-MM-DD HH:mm:ss') }, user);
    return User.query().insert(newUser);
}
