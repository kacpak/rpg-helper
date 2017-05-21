import './styles/main.scss';
import 'babel-polyfill';

import Vue from 'vue';
import VueResource from 'vue-resource';
import socketIo from 'socket.io-client';

import App from './components/App.vue';

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
    created() {
        const socket = socketIo();
        socket.on('connect', () => console.log('Connected', socket.id));
    }
});
