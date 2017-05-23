<template>
    <div class="card">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                    <router-link :to="{ name: 'login' }" active-class="active" class="nav-link">Logowanie</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'register' }" active-class="active" class="nav-link">Rejestracja</router-link>
                </li>
            </ul>
        </div>
        <div class="card-block">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                login: '',
                password: '',
                inProgress: false
            };
        },
        methods: {
            onSubmit() {
                this.inProgress = true;
                this.$store
                    .dispatch('login', {
                        login: this.login,
                        password: this.password
                    })
                    .then(() => {
                        this.$router.push({ name: 'home' })
                    })
                    .finally(() => this.inProgress = false);
            }
        }
    }
</script>
<style lang="scss">

</style>