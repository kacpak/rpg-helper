<template>
    <div class="invite-user-container">
        <h2>
            <router-link :to="{ name: 'session/admin' }"><i class="fa fa-times" aria-hidden="true"></i></router-link>
            Dodaj do sesji
        </h2>
        <form @submit.prevent="onSubmit">
            <fieldset :disabled="inProgress">
                <div class="form-group" :class="{'has-danger': errors.has('login')}">
                    <label for="login">Podaj login nowego użytkownika</label>
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" :class="{'form-control-warning': errors.has('login')}"
                           placeholder="Login" name="login" id="login" v-focus
                           v-model="login" v-validate="'required|min:3'">
                    <div v-if="errors.has('login')" class="form-text form-control-feedback">{{ errors.first('login') }}</div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Dodaj</button>
                </div>
            </fieldset>
        </form>
        <div class="alert mt-2" :class="[isSuccess ? 'alert-success' :  'alert-danger']" role="alert" v-if="message" v-html="message"></div>
    </div>
</template>
<script>
    import isFormValid from '../../../../utils/mixins/isFormValid';
    import Session from '../../../../api/session.api';

    export default {
        mixins: [isFormValid],
        data() {
          return {
              login: '',
              inProgress: false,
              isSuccess: false,
              message: ''
          }
        },
        computed: {
            session() {
                return this.$store.state.sessions.current;
            }
        },
        methods: {
            async onSubmit() {
                try {
                    await this.$validator.validateAll();
                } catch (err) {
                    return;
                }

                this.inProgress = true;
                this.message = '';

                try {
                    await Session.invite({
                        sessionId: this.session.id,
                        userLogin: this.login
                    });
                    this.message = `Użytkownik <strong>${this.login}</strong> dodany do sesji.`;
                    this.isSuccess = true;
                } catch (err) {
                    if (err.body.code === 'SQLITE_CONSTRAINT') {
                        this.message = 'Użytkownik jest już powiązany z sesją!';
                    } else {
                        this.message = 'Wystąpił błąd podczas dodawania użytkownika!';
                    }

                    this.isSuccess = false;
                }

                this.inProgress = false;
            }
        }
    }
</script>
<style lang="scss">
</style>