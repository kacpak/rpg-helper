import * as omit from 'lodash.omit';
import * as path from 'path';
import * as objection from 'objection';
import Model from './_timestamped.model';
import Character from './character.model';
import Session from './session.model';
import CharacterSessionUser from './character_session_user.model';

export default class User extends Model {
    readonly id: number;
    login: string;
    password: string;
    character: Character;

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

    static findById(id: number) {
        return User.query().where('id', id).first();
    }

    static findByLogin(login: string) {
        return User.query().where('login', login).first();
    }

    $formatJson(json, options) {
        json = super.$formatJson(json, options);
        return omit(json, User.$secureFields);
    }

    findSession(sessionId: number) {
        return this.$relatedQuery('sessions').where('session.id', sessionId).first();
    }

    findSessionWithCharacter(sessionId: number) {
        return this.findSession(sessionId).eager('character(essentials, me)', {
            me: builder => builder.where('character_session_user.user_id', this.id)
        });
    }

    findSessionWithDetails(sessionId: number) {
        return this.findSession(sessionId).eager('[user, character(me), chatMessages.user(essentials).character(essentials, me)]', {
            me: builder => builder.where('character_session_user.user_id', this.id)
        });
    }

    async findCharacterBySessionId(sessionId: number) {
        const characterInSession = await this.$relatedQuery<Session>('sessions')
            .select('id')
            .where('session.id', sessionId)
            .eager('character(me)', {
                me: builder => builder.where('character_session_user.user_id', this.id)
            })
            .first();

        return characterInSession && characterInSession.character;
    }

    createSession(sessionDetails: Session) {
        const newSession = Object.assign({ is_active: true, is_game_master: true }, sessionDetails);
        return this
            .$relatedQuery('sessions')
            .insertGraph(newSession);
    }

    joinSession(sessionId: number) {
        return this.$relatedQuery('sessions').relate<Session & CharacterSessionUser>({
            id: sessionId,
            is_game_master: false
        });
    }

    createCharacter(sessionId, characterData) {
        const knex = Character.knex();
        return objection.transaction(knex, async trx => {
            const character: Character = await Character.query(trx).insert(characterData).first();

            await this.$relatedQuery<CharacterSessionUser>('characterSessions', trx)
                .where({ session_id: sessionId })
                .patch({
                    character_id: character.id
                });

            return character;
        });
    }
}
