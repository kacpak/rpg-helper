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
    fetch({ id, detailed }) {
        return Vue.http.get(`/api/sessions/${id}`, {
            params: {
                detailed
            },
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
    },
    invite({ id, userLogin }) {
        return Vue.http.post(`/api/sessions/${id}/invite`, { login: userLogin }, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    },
    createCharacter({ id, character }) {
        return Vue.http.post(`/api/sessions/${id}/character`, { character }, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    },
    editDetails({ id, details }) {
        return Vue.http.post(`/api/sessions/${id}/details`, { details }, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    },
    finish({ id }) {
        return Vue.http.delete(`/api/sessions/${id}/details`, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    },
    resume({ id }) {
        return Vue.http.post(`/api/sessions/${id}/details/resume`, {}, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    }
};
