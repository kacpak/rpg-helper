import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Dashboard, name: 'home' },
        { path: '/login', component: Login, name: 'login' },
        { path: '*', redirect: '/' }
    ]
});
