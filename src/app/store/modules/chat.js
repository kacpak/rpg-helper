import {ADD_MESSAGE, SET_MESSAGES} from '../mutation-types';

export default {
    state: {
        messages: []
    },
    mutations: {
        [SET_MESSAGES](state, messages) {
            state.messages = messages;
        },
        [ADD_MESSAGE](state, message) {
            state.messages.push(message);
        }
    }
};
