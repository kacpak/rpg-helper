<template>
    <div class="create-new-session-container">
        <h2 v-text="$t('sessionCreation.title')"></h2>
        <form @submit.prevent="onSubmit">
            <fieldset :disabled="inProgress">

                <div class="form-group row" :class="{'has-danger': errors.has('name')}">
                    <label for="name" class="col-sm-2 col-form-label" v-text="$t('sessionCreation.name')"></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" name="name" :placeholder="$t('sessionCreation.name')"
                               v-model="name" v-focus v-validate="'required|min:3'">
                        <div v-if="errors.has('name')" class="form-control-feedback" v-text="errors.first('name')"></div>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-sm-2 col-form-label" v-text="$t('sessionCreation.description')"></label>
                    <div class="col-sm-10">
                        <textarea class="form-control" v-model="description" id="description" rows="3"></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                        <button type="submit" class="btn btn-primary" :disabled="!isFormValid" v-text="$t('sessionCreation.submit')"></button>
                    </div>
                </div>

            </fieldset>
        </form>
    </div>
</template>
<script>
    import isFormValid from '../../../utils/mixins/isFormValid';
    export default {
        mixins: [isFormValid],
        data() {
            return {
                name: '',
                description: '',
                inProgress: false
            };
        },
        methods: {
            onSubmit() {
                this.inProgress = true;
                this.$store
                    .dispatch('sessions/create', {
                        name: this.name,
                        description: this.description
                    })
                    .then(() => {
                        this.$router.push({ name: 'home' })
                    })
                    .finally(() => this.inProgress = false);
            }
        }
    }
</script>