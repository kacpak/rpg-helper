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
import SessionDetails from '../views/logged-in/session/admin/EditSessionDetails.vue';

import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: AuthorizedContainer,
            meta: { requiresAuth: true },
            children: [
                { name: 'home', path: '', component: Dashboard },
                { name: 'session/create', path: 'session/create', component: SessionCreate },
                {
                    path: 'session/:id', component: SessionContainer,
                    children: [
                        {
                            name: 'session', path: '',
                            component: Session
                        },
                        {
                            name: 'session/character/create', path: 'init',
                            component: SessionCharacterCreate,
                        },
                        {
                            name: 'session/admin', path: 'admin',
                            component: SessionGameMaster,
                            children: [
                                { name: 'session/admin/invite', path: 'invite', component: SessionInvite },
                                { name: 'session/admin/editSessionDetails', path: 'editSessionDetails', component: SessionDetails }
                            ]
                        }
                    ]
                }
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

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.account.user === null) {
            const user = await store.dispatch('authenticate');
            if (!user) {
                return next({ name: 'login' });
            }
        }
    }

    next();
});

export default router;
