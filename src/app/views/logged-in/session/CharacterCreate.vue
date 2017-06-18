<template>
    <div class="create-character">
        <h2 v-text="$t('characterCreation.title')"></h2>

        <form @submit.prevent="onSubmit">
            <fieldset :disabled="inProgress">
                <div class="form-group row" :class="{'has-danger': errors.has('name')}">
                    <label for="name" class="col-sm-2 col-form-label" v-text="$t('characterCreation.name')"></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :placeholder="$t('characterCreation.name')"
                               id="name" name="name"
                               v-model="character.name" v-validate="'required'" v-focus>
                        <div v-if="errors.has('name')" class="form-control-feedback" v-text="errors.first('name')"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                        <button type="submit" class="btn btn-primary" :disabled="!isFormValid" v-text="$t('characterCreation.submit')"></button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>
<script>
    import api from '../../../api/session.api';
    import store from '../../../store/index'
    import isFormValid from '../../../utils/mixins/isFormValid';

    export default {
        async beforeRouteEnter(to, from, next) {
            if (store.state.sessions.current.character) {
                next({ name: 'session', params: to.params });
            } else {
                next();
            }
        },
        mixins: [isFormValid],
        data() {
            return {
                inProgress: false,
                character: {}
            }
        },
        methods: {
            async onSubmit() {
                this.inProgress = true;
                try {
                    await api.createCharacter({
                        sessionId: this.$route.params.id,
                        character: this.character
                    });
                    await this.$store.dispatch('sessions/fetchNewCurrent', this.$route.params.id);
                    this.$router.replace({
                        name: 'session',
                        params: this.$route.params
                    });

                } catch(err) {
                    console.error(err);
                }
                this.inProgress = false;
            }
        }
    }
</script>