import './styles/main.scss';
import 'babel-polyfill';
import 'bootstrap';

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import { sync } from 'vuex-router-sync';
import messages from './i18n';
import './directives/v-chat-scroll';
import './directives/v-focus';

import App from './components/App.vue';
import store from './store';
import router from './router';
sync(store, router);

const currentLocale = navigator.language || navigator.userLanguage || 'en-US';

Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VeeValidate, {
    locale: currentLocale
});

const i18n = new VueI18n({
    locale: currentLocale,
    fallbackLocale: 'en-US',
    messages
});

new Vue({
    el: '#app',
    components: {
        App
    },
    render(createElement) {
        return createElement(
            'div',
            { attrs: { id: 'app'} },
            [
                createElement('app')
            ]
        );
    },
    store,
    router,
    i18n
});
