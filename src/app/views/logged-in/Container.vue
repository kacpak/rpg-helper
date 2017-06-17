<template>
    <div class="container">
        <div class="header flex-parted">
            <h1 class="display-4"><router-link :to="{ name: 'home' }">RPG Helper</router-link></h1>
            <div class="welcome mb-2 mb-sm-0">
                {{ $t('auth.welcome', { name: loggedInUser }) }}
                <button @click="logout" type="button" class="btn btn-secondary">
                    <i class="fa fa-sign-out" aria-hidden="true"></i> {{ $t('auth.logout') }}
                </button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        computed: {
            loggedInUser() {
                if (this.$store.state.account.user)
                    return this.$store.state.account.user.login;
                return undefined;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => this.$router.push({ name: 'login' }))
            }
        }
    }
</script>