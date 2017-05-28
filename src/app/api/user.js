import Vue from 'vue';
import {getJwtToken} from '../util/storage';


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
    me() {
        return Vue.http.get('/auth/me', {
            headers: {
                Authorization: `JWT ${getJwtToken()}`
            }
        });
    }
};
