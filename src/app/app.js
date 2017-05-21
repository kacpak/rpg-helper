import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './components/App.vue';

Vue.use(VueResource);

export default function() {
    return new Vue({
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
        }
    });
}
