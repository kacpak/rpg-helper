import Vue from 'vue';
import VueRouter from 'vue-router';

import GuestContainer from '../views/guest/Container.vue';
import Login from '../views/guest/Login.vue';
import Register from '../views/guest/Register.vue';

import AuthorizedContainer from '../views/logged-in/Container.vue';
import Dashboard from '../views/logged-in/Dashboard.vue';
import SessionContainer from '../views/logged-in/session/Container.vue';

import Session from '../views/logged-in/session/Session.vue';
import SessionCreate from '../views/logged-in/session/Create.vue';
import SessionCharacterCreate from '../views/logged-in/session/CharacterCreate.vue';

import SessionGameMaster from '../views/logged-in/session/admin/Admin.vue';
import SessionInvite from '../views/logged-in/session/admin/Invite.vue';

import store from '../store/index';

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
                {
                    path: 'session/:id', component: SessionContainer,
                    children: [
                        { path: '', component: Session, name: 'session' },
                        { path: 'init', component: SessionCharacterCreate, name: 'session/character/create' },
                        {
                            path: 'admin', component: SessionGameMaster, name: 'session/admin',
                            children: [
                                { path: 'invite', component: SessionInvite, name: 'session/admin/invite' }
                            ]
                        }
                    ]
                },
                { path: 'session/create', component: SessionCreate, name: 'session/create' },
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
