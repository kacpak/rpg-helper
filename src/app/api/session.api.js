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
    invite({ sessionId, userLogin }) {
        return Vue.http.post(`/api/sessions/${sessionId}/invite`, { login: userLogin }, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    },
    createCharacter({sessionId, character}) {
        return Vue.http.post(`/api/sessions/${sessionId}/character`, { character }, {
            headers: {
                Authorization: `JWT ${store.state.account.token}`
            }
        });
    }
};
