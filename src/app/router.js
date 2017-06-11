import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './components/authorized/Dashboard.vue';
import Invite from './components/authorized/session/admin/Invite.vue';
import GuestContainer from './components/guest/Container.vue';
import Login from './components/guest/Login.vue';
import Register from './components/guest/Register.vue';
import Session from './components/authorized/session/Session.vue';
import SessionGameMasterPanel from './components/authorized/session/admin/Panel.vue';
import NewSession from './components/authorized/session/NewSession.vue';
import AuthorizedContainer from './components/authorized/Container.vue';
import store from './store';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: AuthorizedContainer,
            async beforeEnter(to, from, next) {
                if (store.state.account.user === null) {
                    const user = await store.dispatch('authenticate');
                    if (!user) {
                        return next({ name: 'login' });
                    }
                }
                return next();
            },
            children: [
                { path: '', component: Dashboard, name: 'home' },
                { path: 'session/:id', component: Session, name: 'session' },
                {
                    path: 'session/:id/admin', component: SessionGameMasterPanel, name: 'session/admin',
                    children: [
                        { path: 'invite', component: Invite, name: 'session/admin/invite' }
                    ]
                },
                { path: 'new-session', component: NewSession, name: 'session/create' },
            ]
        },
        {
            path: '/auth', component: GuestContainer,
            children: [
                { path: 'login', component: Login, name: 'login' },
                { path: 'register', component: Register, name: 'register' },
                { path: '', redirect: { name: 'login' } }
            ]
        },
        { path: '*', redirect: '/' }
    ]
});
