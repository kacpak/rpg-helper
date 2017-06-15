import path from 'path';
import Model from './_timestamped.model';

export default class Character extends Model {
    static tableName = 'character';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'user.model'),
            join: {
                from: 'character.id',
                through: {
                    from: 'character_session_user.character_id',
                    to: 'character_session_user.user_id'
                },
                to: 'user.id'
            }
        },
        session: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, 'session.model'),
            join: {
                from: 'character.id',
                through: {
                    from: 'character_session_user.character_id',
                    to: 'character_session_user.session_id'
                },
                to: 'session.id'
            }
        }
    };

    static jsonSchema = {
        type: 'object',
        required: ['name'],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 255 },
            hit_points: { type: 'integer' },
            status: { type: 'integer' },
            experience: { type: 'integer' },
            strength: { type: 'integer' },
            constitution: { type: 'integer' },
            dexterity: { type: 'integer' },
            intelligence: { type: 'integer' },
            wisdom: { type: 'integer' },
            charisma: { type: 'integer' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
        }
    };
}
