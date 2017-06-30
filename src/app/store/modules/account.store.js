import User from '../../api/user.api';
import {AUTHENTICATE, UNAUTHENTICATE} from '../mutation-types';

export default {
    state: {
        user: null,
        token: null
    },
    mutations: {
        [AUTHENTICATE](state, { user, token }) {
            state.user = user;
            state.token = token;
            localStorage.setItem('JWT', token);
        },
        [UNAUTHENTICATE](state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('JWT');
        }
    },
    actions: {
        login({commit}, {login, password}) {
            return User.login(login, password)
                .then(response => response.json())
                .then(payload => commit(AUTHENTICATE, payload))
                .catch(err => {
                    commit(UNAUTHENTICATE);
                    throw err;
                });
        },
        async authenticate({commit}) {
            const jwt = localStorage.getItem('JWT');

            if (!jwt) {
                return null;
            }

            try {
                const {body: user} = await User.me(jwt);
                commit(AUTHENTICATE, { user, token: jwt });
                return user;
            } catch (err) {
                commit(UNAUTHENTICATE);
                return null;
            }
        },
        logout({commit}) {
            return User.logout()
                .finally(() => commit(UNAUTHENTICATE));
        }
    }
};
