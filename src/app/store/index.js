import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account.store';
import sessions from './modules/sessions.store';
import chat from './modules/chat.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        sessions,
        chat
    },
    strict: process.env.NODE_ENV !== 'production'
});
