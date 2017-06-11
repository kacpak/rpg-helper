<template>
    <div class="game-master-panel">
        <h1><router-link :to="{ name: 'session/admin' }">&#x2605;</router-link> {{ session.name }}</h1>
        <p>{{ session.description }}</p>
        <div class="row">
            <div class="panel col-md-5">
                <h2>Panel</h2>
                <ul>
                    <li><router-link :to="{ name: 'session/admin/invite' }">Zaproś użytkownika</router-link></li>
                    <li>Edytuj dane sesji</li>
                    <li>Dodaj przedmioty</li>
                    <li>Dodaj umiejętności</li>
                    <li>Dodaj umiejętności magiczne</li>
                    <li>Modyfikuj karty postaci</li>
                </ul>
            </div>
            <div class="col-md-7">
                <h2>Chat</h2>
                <chat :id="session.id"></chat>
            </div>
        </div>
        <router-view class="inner-panel"></router-view>
    </div>
</template>
<script>
    import store from '../../../../store/index'
    import ChatComponent from '../../Chat.vue';

    export default {
        created() {
        },
        computed: {
            session() {
                return this.$store.state.sessions.current;
            }
        },
        async beforeRouteEnter(to, from, next) {
            try {
                await store.dispatch('sessions/fetchNewCurrent', to.params.id);
                if (store.state.sessions.current.is_game_master) {
                    next();
                } else {
                    throw 'Unauthorized access to game master section';
                }
            } catch(err) {
                next(false);
            }
        },
        components: {
            chat: ChatComponent
        }
    }
</script>
<style lang="scss">
    .game-master-panel {
        .chat {
            height: 20em;
        }

        .inner-panel {
            margin-top: 2rem;
        }
    }
</style>