<template>
    <form @submit.prevent="onSubmit" :class="{'has-danger': registrationError}">
        <fieldset :disabled="inProgress">
            <div class="form-group row" :class="{'has-danger': errors.has('login')}">
                <label for="login" class="col-sm-2 col-form-label">Login</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" placeholder="Login"
                           name="login" id="login"
                           v-model="login"
                           v-validate="'required|min:3'"
                    >
                    <div v-if="errors.has('login')" class="form-control-feedback">{{ errors.first('login') }}</div>
                </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('password')}">
                <label for="password" class="col-sm-2 col-form-label">Hasło</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" placeholder="Hasło"
                           id="password"
                           name="password"
                           v-model="password"
                           v-validate="'required|min:8'"
                    >
                    <div v-if="errors.has('password')" class="form-control-feedback">{{ errors.first('password') }}</div>
                </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('password-confirm')}">
                <label for="password-confirm" class="col-sm-2 col-form-label">Potwierdź hasło</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" placeholder="Potwierdź hasło"
                           id="password-confirm"
                           name="password-confirm"
                           v-validate="'confirmed:password'"
                    >
                    <div v-if="errors.has('password-confirm')" class="form-control-feedback">
                        Hasła nie są takie same!
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Zarejestruj się</button>
                    <div v-if="registrationError" class="form-control-feedback">{{ registrationError }}</div>
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
                inProgress: false,
                registrationError: null
            };
        },
        computed: {
            isFormValid() {
                return Object.keys(this.fields).every(key => this.fields[key].valid)
            }
        },
        methods: {
            async onSubmit() {
                try {
                    await this.$validator.validateAll();
                    this.inProgress = true;
                    this.registrationError = null;
                    this.$store
                        .dispatch('register', {
                            login: this.login,
                            password: this.password
                        })
                        .then(response => {
                            this.$router.push({name: 'login'})
                        })
                        .catch(response => {
                            if (response.body.code === 'SQLITE_CONSTRAINT') {
                                this.registrationError = `Użytkownik o podanym loginie już istnieje.`;
                            } else {
                                this.registrationError = `There was a problem during registration. Please try again later.`;
                            }
                        })
                        .finally(() => this.inProgress = false);
                } catch (err) {
                    //Nothing
                }
            }
        }
    }
</script>
<style lang="scss">

</style>