import Vue from 'vue';
import App from './components/App.vue';

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
