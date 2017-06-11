import omit from 'lodash.omit';
import path from 'path';
import Model from './_timestamped.model';

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

    static jsonSchema = {
        type: 'object',
        required: ['login', 'password'],

        properties: {
            id: { type: 'integer' },
            login: { type: 'string', minLength: 3, maxLength: 255 },
            password: { type: 'string', maxLength: 255 },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
        }
    };

    static findById(id) {
        return User.query().where('id', id).first();
    }

    static findByLogin(login) {
        return User.query().where('login', login).first();
    }

    $formatJson(json, options) {
        json = super.$formatJson(json, options);
        return omit(json, User.$secureFields);
    }

    findSession(sessionId) {
        return this.$relatedQuery('sessions').where('session.id', sessionId).first();
    }

    createSession(sessionDetails) {
        const newSession = Object.assign({ is_active: true, is_game_master: true }, sessionDetails);
        return this
            .$relatedQuery('sessions')
            .insertGraph(newSession);
    }

    joinSession(sessionId) {
        return this.$relatedQuery('sessions').relate({
            id: sessionId,
            is_game_master: false
        });
    }
}
