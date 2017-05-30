import Session from '../../api/session';
import {SET_SESSIONS, SET_CURRENT_SESSION} from '../mutation-types';

export default {
    namespaced: true,
    state: {
        sessions: [],
        current: null
    },
    getters: {
        active: state => state.sessions.filter(session => session.active),
        finished: state => state.sessions.filter(session => !session.active)
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
        }
    }
};
