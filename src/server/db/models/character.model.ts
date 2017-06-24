import * as path from 'path';
import Model from './_timestamped.model';

export default class Character extends Model {
    readonly id: number;
    name: string;
    hit_points: number;
    status: number;
    experience: number;
    strength: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;

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

    static namedFilters = {
        essentials(builder) {
            builder.select('id', 'name');
        }
    };

    static jsonSchema = {
        type: 'object',
        required: ['name'],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 255 },
            hit_points: { type: 'integer', default: 1 },
            status: { type: 'integer', default: 1 },
            experience: { type: 'integer', default: 0 },
            strength: { type: 'integer', default: 0 },
            constitution: { type: 'integer', default: 0 },
            dexterity: { type: 'integer', default: 0 },
            intelligence: { type: 'integer', default: 0 },
            wisdom: { type: 'integer', default: 0 },
            charisma: { type: 'integer', default: 0 },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
        }
    };
}
