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
    }
};
