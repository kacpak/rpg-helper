import Session from '../../api/session.api';
import {SET_SESSIONS, SET_CURRENT_SESSION, SET_MESSAGES} from '../mutation-types';

export default {
    namespaced: true,
    state: {
        sessions: [],
        current: null
    },
    getters: {
        active: state => state.sessions.filter(session => session.is_active),
        finished: state => state.sessions.filter(session => !session.is_active)
    },
    mutations: {
        [SET_SESSIONS](state, sessions) {
            state.sessions = sessions;
        },
        [SET_CURRENT_SESSION](state, session) {
            state.current = session;
        }
    },
    actions: {
        create({dispatch}, {name, description}) {
            return Session.create(name, description)
                .then(response => {
                    dispatch('fetchAll');
                    return response;
                })
                .then(response => response.json());
        },
        fetchAll({commit}) {
            return Session.fetchAll()
                .then(response => response.body)
                .then(sessions => commit(SET_SESSIONS, sessions))
                .catch(console.error);
        },
        fetchNewCurrent({commit}, id) {
            return Session.fetch({ id, detailed: true })
                .then(response => response.body)
                .then(session => {
                    commit(SET_MESSAGES, session.chatMessages, { root: true });
                    delete session.chatMessages;
                    commit(SET_CURRENT_SESSION, session);
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        }
    }
};
