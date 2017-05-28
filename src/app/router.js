import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './components/authorized/Dashboard.vue';
import GuestContainer from './components/guest/Container.vue';
import Login from './components/guest/Login.vue';
import Register from './components/guest/Register.vue';
import Session from './components/authorized/Session.vue';
import NewSession from './components/authorized/NewSession.vue';
import AuthorizedContainer from './components/authorized/Container.vue';
import store from './store';
import {getJwtToken} from './util/storage';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: AuthorizedContainer,
            async beforeEnter(to, from, next) {
                if (store.state.account.user === null) {
                    if (getJwtToken()) {
                        await store.dispatch('authenticate');
                        return next();
                    }
                    return next({ name: 'login' });
                }
                return next();
            },
            children: [
                { path: '', component: Dashboard, name: 'home' },
                { path: 'session/:id', component: Session, name: 'session' },
                { path: 'new-session', component: NewSession, name: 'new-session' },
            ]
        },
        {
            path: '/auth',
            component: GuestContainer,
            children: [
                { path: 'login', component: Login, name: 'login' },
                { path: 'register', component: Register, name: 'register' },
                { path: '', redirect: { name: 'login' } }
            ]
        },
        { path: '*', redirect: '/' }
    ]
});
