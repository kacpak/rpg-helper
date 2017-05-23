import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Auth from './components/Auth.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Dashboard, name: 'home' },
        {
            path: '/auth',
            component: Auth,
            children: [
                { path: 'login', component: Login, name: 'login' },
                { path: 'register', component: Register, name: 'register' },
                { path: '', redirect: { name: 'login' } }
            ]
        },
        { path: '*', redirect: '/' }
    ]
});
