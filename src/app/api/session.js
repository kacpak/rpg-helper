import Vue from 'vue';
import store from '../store';

export default {
    fetchAll() {
        return Vue.http.get('/api/sessions', {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    },
    create(name, description) {
        return Vue.http.post('/api/sessions', {name, description}, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    }
};
