<template>
    <div class="card">
        <div class="card-block">
            <h4 class="card-title">Logowanie</h4>
            <form @submit.prevent="onSubmit">
                <fieldset  :disabled="inProgress">
                    <div class="form-group row">
                        <label for="login" class="col-sm-2 col-form-label">Login</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="login" id="login" placeholder="Login">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-2 col-form-label">Hasło</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" v-model="password" id="password" placeholder="Hasło">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                            <button type="submit" class="btn btn-primary">Zaloguj się</button>
                        </div>
                    </div>
                </fieldset>
            </form>
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