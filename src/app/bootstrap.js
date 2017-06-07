import './styles/main.scss';
import 'babel-polyfill';
import 'bootstrap';

import Vue from 'vue';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import { sync } from 'vuex-router-sync';
import './directives/v-chat-scroll';

import App from './components/App.vue';
import store from './store';
import router from './router';
sync(store, router);

Vue.use(VueResource);
Vue.use(VeeValidate, {
    locale: 'en'
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
    router
});
