<template>
    <div class="create-character">
        Stwórz postać!!!
    </div>
</template>
<script>
    import store from '../../../store/index'

    export default {
        async beforeRouteEnter(to, from, next) {
            if (store.state.sessions.current.character) {
                next({ name: 'session', params: to.params });
            } else {
                next();
            }
        },
    }
</script>