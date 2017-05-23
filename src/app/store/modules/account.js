import User from '../../api/user';

export default {
    state: {
        user: null
    },
    mutations: {
        authenticate(state, user) {
            state.user = user;
        },
        unauthenticate(state) {
            state.user = null;
        }
    },
    actions: {
        login({commit}, {login, password}) {
            return User.login(login, password)
                .then(response => response.json())
                .then(user => commit('authenticate', user))
                .catch(() => commit('unauthenticate'));
        },
        logout({commit}) {
            return User.logout()
                .finally(() => commit('unauthenticate'));
        },
        register({commit}, {login, password}) {
            return User.register(login, password);
        }
    }
};
