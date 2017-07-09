<template>
    <div class="user-session">
        <div class="row">
            <character :character="session.character" class="col-md-6"></character>
            <div class="chat-container col-md-6">
                <h3 class="header" v-text="$t('admin.chat.title')"></h3>
                <chat :id="$route.params.id"></chat>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../../store/index'
    import ChatComponent from '../../../components/Chat.vue';
    import CharacterComponent from '../../../components/Character.vue';

    export default {
        computed: {
            session() {
                return this.$store.state.sessions.current;
            }
        },
        async beforeRouteEnter(to, from, next) {
            // If user is current session Game Master redirect to GM Panel
            if (store.state.sessions.current.is_game_master) {
                next({ name: 'session/admin' });

            // If user character exists continue to this component
            } else if (store.state.sessions.current.character) {
                next();

            // If user character does not exits redirect to character creation
            } else {
                next({ name: 'session/character/create', params: to.params });
            }
        },
        components: {
            chat: ChatComponent,
            character: CharacterComponent
        },
    }
</script>
<style lang="scss">
    .chat {
        height: 25em;
    }
</style>