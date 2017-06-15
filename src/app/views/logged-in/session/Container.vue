<template>
    <div class="session">
        <h1>{{ session.name }}</h1>
        <p>{{ session.description }}</p>
        <router-view></router-view>
    </div>
</template>
<script>
    import store from '../../../store/index'
    import ChatComponent from '../../../components/Chat.vue';

    export default {
        computed: {
            session() {
                return this.$store.state.sessions.current;
            }
        },
        async beforeRouteEnter(to, from, next) {
            try {
                await store.dispatch('sessions/fetchNewCurrent', to.params.id);
                next();
            } catch(err) {
                next(false);
            }
        },
    }
</script>