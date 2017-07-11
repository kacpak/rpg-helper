<template>
    <div class="create-character">
        <h2 v-text="$t('characterCreation.title')" class="header"></h2>

        <form @submit.prevent="onSubmit">
            <fieldset :disabled="inProgress">
                <div class="row">
                    <div class="col-md-6">
                        <h4 v-text="$t('characterCreation.basic')"></h4>
                        <row name="name" :label="$t('character.basic.name')" v-model="character.name" validate="required" focused></row>
                        <row name="race" :label="$t('character.basic.race')" v-model="character.race" validate="required"></row>
                        <row name="character" :label="$t('character.basic.character')" v-model="character.character" validate="required"></row>
                        <row name="deity" :label="$t('character.basic.deity')" v-model="character.deity" validate="required"></row>
                    </div>
                    <div class="col-md-6">
                        <h4 v-text="$t('characterCreation.appearance')"></h4>
                        <row name="size" :label="$t('character.appearance.size')" v-model="character.size" validate="required"></row>
                        <row name="age" :label="$t('character.appearance.age')" v-model="character.age" validate="required"></row>
                        <row name="sex" :label="$t('character.appearance.sex')" v-model="character.sex" validate="required"></row>
                        <row name="height" :label="$t('character.appearance.height')" v-model="character.height" validate="required"></row>
                        <row name="weight" :label="$t('character.appearance.weight')" v-model="character.weight" validate="required"></row>
                        <row name="eyes" :label="$t('character.appearance.eyes')" v-model="character.eyes" validate="required"></row>
                        <row name="hair" :label="$t('character.appearance.hair')" v-model="character.hair" validate="required"></row>
                        <row name="skin" :label="$t('character.appearance.skin')" v-model="character.skin" validate="required"></row>
                    </div>
                </div>
                <div class="form-group">
                    <div class="pull-right">
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
    import FormGroupRow from '../../../components/FormGroupRow.vue';

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
                        id: this.$route.params.id,
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
        },
        components: {
            row: FormGroupRow
        }
    }
</script>