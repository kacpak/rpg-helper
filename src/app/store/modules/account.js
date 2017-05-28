import User from '../../api/user';
import { saveJwtToken, getJwtToken } from '../../util/storage';

export default {
    state: {
        user: null,
        token: null
    },
    mutations: {
        authenticate(state, { user, token }) {
            state.user = user;
            saveJwtToken(token);
            state.token = token;
        },
        unauthenticate(state) {
            state.user = null;
            state.token = null;
            saveJwtToken(null);
        }
    },
    actions: {
        login({commit}, {login, password}) {
            return User.login(login, password)
                .then(response => response.json())
                .then(payload => commit('authenticate', payload))
                .catch(() => commit('unauthenticate'));
        },
        authenticate({commit}) {
            return User.me()
                .then(response => response.json())
                .then(user => commit('authenticate', { user, token: getJwtToken() }))
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
