import Vue from 'vue';
import {getJwtToken} from '../util/storage';

export default {
    fetchAll() {
        return Vue.http.get('/api/sessions', {
            headers: {
                Authorization: `JWT ${getJwtToken()}`
            }
        });
    },
    create(name, description) {
        return Vue.http.post('/api/sessions', {name, description}, {
            headers: {
                Authorization: `JWT ${getJwtToken()}`
            }
        });
    }
};
