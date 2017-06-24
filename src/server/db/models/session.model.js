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
        user: {
            relation: Model.HasOneThroughRelation,
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
        characters: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, 'character.model'),
            join: {
                from: 'session.id',
                through: {
                    from: 'character_session_user.session_id',
                    to: 'character_session_user.character_id'
                },
                to: 'character.id'
            }
        },
        character: {
            relation: Model.HasOneThroughRelation,
            modelClass: path.join(__dirname, 'character.model'),
            join: {
                from: 'session.id',
                through: {
                    from: 'character_session_user.session_id',
                    to: 'character_session_user.character_id'
                },
                to: 'character.id'
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

    static jsonSchema = {
        type: 'object',
        required: ['name'],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 3, maxLength: 255 },
            description: { type: ['null', 'string'] },
            notes: { type: ['null', 'string'] },
            is_active: { type: 'boolean', default: true }
        }
    };

    getChatMessages() {
        return this.$relatedQuery('chatMessages').eager('user(essentials).character(essentials)');
    }

    editDetails(details) {
        const {name, description, notes} = details;

        return this.$query().patchAndFetch({name, description, notes});
    }

    finish() {
        return this.$query().patchAndFetch({is_active: false});
    }

    resume() {
        return this.$query().patchAndFetch({is_active: true});
    }
}
