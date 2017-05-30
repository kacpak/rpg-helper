import Vue from 'vue';
import store from '../store';


export default {
    login(login, password) {
        return Vue.http.post('/auth/login', { login, password });
    },
    logout() {
        return Vue.http.get('/auth/logout');
    },
    register(login, password) {
        return Vue.http.post('/auth/register', { login, password })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response;
            });
    },
    me(token = store.state.account.token) {
        return Vue.http.get('/auth/me', {
            headers: {
                Authorization: `JWT ${token}`
            }
        });
    }
};
