import omit from 'lodash.omit';
import path from 'path';
import objection from 'objection';
import Model from './_timestamped.model';
import Character from './character.model';

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
                    extra: ['is_game_master', 'character_id']
                },
                to: 'session.id'
            }
        },
        character: {
            relation: Model.HasOneThroughRelation,
            modelClass: path.join(__dirname, 'character.model'),
            join: {
                from: 'user.id',
                through: {
                    from: 'character_session_user.user_id',
                    to: 'character_session_user.character_id',
                    extra: ['is_game_master', 'session_id']
                },
                to: 'character.id'
            }
        },
        characterSessions: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, 'character_session_user.model'),
            join: {
                from: 'user.id',
                to: 'character_session_user.user_id'
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

    static namedFilters = {
        essentials(builder) {
            builder.select('id', 'login');
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

    async findCharacterBySessionId(sessionId) {
        const characterInSession = await this.$relatedQuery('sessions')
            .select('id')
            .where('session.id', sessionId)
            .eager('character')
            .first();

        return characterInSession.character;
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

    createCharacter(sessionId, characterData) {
        const knex = Character.knex();
        return objection.transaction(knex, async trx => {
            const character = await Character.query(trx).insert(characterData);

            await this.$relatedQuery('characterSessions', trx)
                .where({ session_id: sessionId })
                .patch({
                    character_id: character.id
                });

            return character;
        });
    }
}
