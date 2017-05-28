<template>
    <form @submit.prevent="onSubmit">
        <fieldset :disabled="inProgress">
            <div class="form-group row" :class="{'has-danger': !!error}">
                <label for="login" class="col-sm-2 col-form-label">Login</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="login" id="login" placeholder="Login">
                </div>
            </div>
            <div class="form-group row" :class="{'has-danger': !!error}">
                <label for="password" class="col-sm-2 col-form-label">Hasło</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" v-model="password" id="password" placeholder="Hasło">
                </div>
            </div>
            <div class="form-group row" :class="{'has-danger': !!error}">
                <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Zarejestruj się</button>
                    <div class="form-control-feedback">{{error}}</div>
                </div>
            </div>
        </fieldset>
    </form>
</template>
<script>
    export default {
        data() {
            return {
                login: '',
                password: '',
                error: null,
                inProgress: false
            };
        },
        methods: {
            onSubmit() {
                this.error = null;
                this.inProgress = true;
                this.$store
                    .dispatch('register', {
                        login: this.login,
                        password: this.password
                    })
                    .then(response => {
                        this.$router.push({ name: 'login' })
                    })
                    .catch(response => {
                        if (response.body.code === 'SQLITE_CONSTRAINT') {
                            this.error = `User with such login already exists.`;
                        } else {
                            this.error = `There was a problem during registration. Please try again later.`;
                        }
                    })
                    .finally(() => this.inProgress = false);
            }
        }
    }
</script>
<style lang="scss">

</style>