import Session from '../../api/session';

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
        setSessions(state, sessions) {
            state.sessions = sessions;
        },
        setCurrentSession(state, session) {
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
                .then(sessions => commit('setSessions', sessions))
                .catch(console.error);
        }
    }
};
