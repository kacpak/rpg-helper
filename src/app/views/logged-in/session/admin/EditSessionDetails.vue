<template>
    <div class="edit-session-details">
        <h2 class="flex-parted">
            <span v-text="$t('admin.editSessionDetails.title')">{{ $t('admin.inviteUser.title') }}</span>
            <router-link :to="{ name: 'session/admin' }"><i class="fa fa-times" aria-hidden="true"></i></router-link>
        </h2>
        <form @submit.prevent="onSubmit">
            <fieldset :disabled="inProgress">
                <div class="form-group row" :class="{'has-danger': errors.has('name')}">
                    <label for="name" class="col-sm-2 col-form-label" v-text="$t('admin.editSessionDetails.name')"></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :placeholder="$t('admin.editSessionDetails.name')"
                               id="name" name="name"
                               v-model="session.name" v-validate="'required|min:3'" v-focus>
                        <div v-if="errors.has('name')" class="form-control-feedback" v-text="errors.first('name')"></div>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-sm-2 col-form-label" v-text="$t('admin.editSessionDetails.description')"></label>
                    <div class="col-sm-10">
                        <textarea class="form-control" v-model="session.description" id="description" rows="3"></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="notes" class="col-sm-2 col-form-label" v-text="$t('admin.editSessionDetails.notes')"></label>
                    <div class="col-sm-10">
                        <textarea class="form-control" v-model="session.notes" id="notes" rows="6"></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                        <button type="submit" class="btn btn-primary" :disabled="!isFormValid"
                                v-text="$t('admin.editSessionDetails.submit')"></button>
                    </div>
                </div>
            </fieldset>
        </form>
        <transition name="fade" mode="out-in">
            <div class="finish-session mt-5" v-if="session.is_active">
                <p v-text="$t('admin.editSessionDetails.finishSession')"></p>

                <div class="row">
                    <div class="offset-sm-2 col-sm-10">
                        <button type="button" class="btn btn-danger" :disabled="inProgress" @click="onFinish"
                                v-text="$t('admin.editSessionDetails.finishSessionSubmit')"></button>
                    </div>
                </div>
            </div>
            <div class="finish-session mt-5" v-else>
                <p v-text="$t('admin.editSessionDetails.restartSession')"></p>

                <div class="row">
                    <div class="offset-sm-2 col-sm-10">
                        <button type="button" class="btn btn-success" :disabled="inProgress" @click="onResume"
                                v-text="$t('admin.editSessionDetails.restartSessionSubmit')"></button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import isFormValid from '../../../../utils/mixins/isFormValid';

    export default {
        mixins: [isFormValid],
        data() {
            return {
                session: JSON.parse(JSON.stringify(this.$store.state.sessions.current)),
                inProgress: false
            }
        },
        methods: {
            async onSubmit() {
                this.inProgress = true;
                try {
                    await this.$validator.validateAll();
                    await this.$store.dispatch('sessions/editCurrent', this.session);
                } catch (err) {
                    // Nothing
                }
                this.inProgress = false;
            },
            async onFinish() {
                this.inProgress = true;
                try {
                    await this.$store.dispatch('sessions/finishCurrent');
                    this.session = JSON.parse(JSON.stringify(this.$store.state.sessions.current));
                } catch (err) {
                    // Nothing
                }
                this.inProgress = false;
            },
            async onResume() {
                this.inProgress = true;
                try {
                    await this.$store.dispatch('sessions/resumeCurrent');
                    this.session = JSON.parse(JSON.stringify(this.$store.state.sessions.current));
                } catch (err) {
                    // Nothing
                }
                this.inProgress = false;
            }
        }
    }
</script>