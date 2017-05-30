import './styles/main.scss';
import 'babel-polyfill';
import 'bootstrap';

import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './components/App.vue';
import { sync } from 'vuex-router-sync';
import store from './store';
import router from './router';
sync(store, router);

Vue.use(VueResource);

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
