import { Model } from 'objection';

export default class CharacterSessionUser extends Model {
    static tableName = 'character_session_user';

    static get idColumn() {
        return ['user_id', 'session_id'];
    }

    static jsonSchema = {
        type: 'object',
        required: ['name'],

        properties: {
            user_id: { type: 'integer' },
            session_id: { type: 'integer' },
            character_id: { type: 'integer' },
            is_game_master: { type: 'boolean' },
        }
    };
}
