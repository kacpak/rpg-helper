<template>
    <div class="container">
        <div class="header">
            <h1 class="display-4"><router-link :to="{ name: 'home' }">RPG Helper</router-link></h1>
            <div v-if="loggedInUser">
                Witaj, {{ loggedInUser }}! <button @click="logout" type="button" class="btn btn-secondary">Logout</button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            loggedInUser() {
                console.log(this.$store.state.account.user);
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
<style lang="scss">
    .header {
        display: flex;
        align-items: center;

        > *:first-child {
            flex: 1;
        }

        a {
            text-decoration: none;
        }
    }
</style>