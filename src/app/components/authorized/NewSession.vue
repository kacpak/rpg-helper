<template>
    <form @submit.prevent="onSubmit">
        <fieldset :disabled="inProgress">
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">Nazwa</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="name" id="name" placeholder="Nazwa">
                </div>
            </div>
            <div class="form-group row">
                <label for="description" class="col-sm-2 col-form-label">Opis</label>
                <div class="col-sm-10">
                    <textarea class="form-control" v-model="description" id="description" rows="3"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Stwórz</button>
                </div>
            </div>
        </fieldset>
    </form>
</template>
<script>
    export default {
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
<style lang="sass">

</style>