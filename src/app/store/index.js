import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import sessions from './modules/sessions';
import chat from './modules/chat';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        sessions,
        chat
    },
    strict: process.env.NODE_ENV !== 'production'
});
