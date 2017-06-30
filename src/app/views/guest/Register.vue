<template>
    <form @submit.prevent="onSubmit" :class="{'has-danger': registrationError}">
        <fieldset :disabled="inProgress">
            <div class="form-group row" :class="{'has-danger': errors.has('login')}">
                <label for="login" class="col-sm-2 col-form-label">{{ $t('auth.login.field') }}</label>
                <div class="col-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
                        <input type="text" class="form-control" :placeholder="$t('auth.login.field')"
                               id="login" name="login"
                               v-model="login" v-validate="'required|min:3'" v-focus>
                    </div>
                    <div v-if="errors.has('login')" class="form-control-feedback">{{ errors.first('login') }}</div>
                </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('password')}">
                <label for="password" class="col-sm-2 col-form-label">{{ $t('auth.password.field') }}</label>
                <div class="col-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
                        <input type="password" class="form-control" :placeholder="$t('auth.password.field')"
                               id="password" name="password"
                               v-model="password" v-validate="'required|min:8'">
                    </div>
                    <div v-if="errors.has('password')" class="form-control-feedback">{{ errors.first('password') }}</div>
                </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('password-confirm')}">
                <label for="password-confirm" class="col-sm-2 col-form-label">{{ $t('auth.password.confirm') }}</label>
                <div class="col-sm-10">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
                        <input type="password" class="form-control" :placeholder="$t('auth.password.confirm')"
                               id="password-confirm" name="password-confirm"
                               v-validate="'confirmed:password'">
                    </div>
                    <div v-if="errors.has('password-confirm')" class="form-control-feedback">
                        {{ $t('auth.password.error') }}
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary" :disabled="!isFormValid">{{ $t('auth.registration.submit') }}</button>
                    <div v-if="registrationError" class="form-control-feedback">{{ registrationError }}</div>
                </div>
            </div>
        </fieldset>
    </form>
</template>
<script>
    import isFormValid from '../../utils/mixins/isFormValid';
    import User from '../../api/user.api';

    export default {
        mixins: [isFormValid],
        data() {
            return {
                login: '',
                password: '',
                inProgress: false,
                registrationError: null
            };
        },
        methods: {
            async onSubmit() {
                this.inProgress = true;
                try {
                    await this.$validator.validateAll();
                    this.registrationError = null;

                    await User.register(this.login, this.password);
                    this.$router.push({name: 'login'});

                } catch (err) {
                    if (err.body && err.body.code === 'SQLITE_CONSTRAINT') {
                        this.registrationError = this.$t('auth.registration.errors.usernameTaken');
                    } else {
                        this.registrationError = this.$t('auth.registration.errors.general');
                    }
                }
                this.inProgress = false;
            }
        }
    }
</script>
<style lang="scss">

</style>