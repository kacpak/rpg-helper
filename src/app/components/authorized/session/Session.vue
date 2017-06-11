<template>
    <div class="session">
        <h1>{{ session.name }}</h1>
        <p>{{ session.description }}</p>
        <chat :id="$route.params.id"></chat>
    </div>
</template>
<script>
    import store from '../../../store/index'
    import ChatComponent from '../Chat.vue';

    export default {
        computed: {
            session() {
                return this.$store.state.sessions.current;
            }
        },
        components: {
            chat: ChatComponent
        },
        async beforeRouteEnter(to, from, next) {
            try {
                await store.dispatch('sessions/fetchNewCurrent', to.params.id);
                // TODO check if character created -> if not redirect to character creation
                if (!store.state.sessions.current.is_game_master) {
                    next();
                } else {
                    throw 'Game Master cannot enter normal player session';
                }
            } catch(err) {
                next(false);
            }
        },
    }
</script>
<style lang="scss">
    .chat {
        height: 30em;
    }
</style>