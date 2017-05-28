import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import sessions from './modules/sessions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        sessions
    },
    strict: process.env.NODE_ENV !== 'production'
});
