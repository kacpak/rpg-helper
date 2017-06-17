<template>
    <div class="container">
        <div class="header">
            <h1 class="display-4"><router-link :to="{ name: 'home' }">RPG Helper</router-link></h1>
            <div class="welcome">
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
<style lang="scss" scoped>
    @import "../../styles/variables";

    .header {
        @media(min-width: map-get($grid-breakpoints, sm)) {
            display: flex;
            align-items: center;

            > *:first-child {
                flex: 1;
            }
        }

        .welcome {
            text-align: right;
        }
    }
</style>