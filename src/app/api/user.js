import Vue from 'vue';

export default {
    login(login, password) {
        return Vue.http.post('/auth/login', null, {
            headers: {
                Authorization: `Basic ${btoa(`${login}:${password}`)}`
            }
        });
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
    }
};
