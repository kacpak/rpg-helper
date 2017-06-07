<template>
    <div class="session">
        Session id: <strong>{{ $route.params.id }}</strong>
        <chat socket="socket" :id="$route.params.id"></chat>
    </div>
</template>
<script>
    import ChatComponent from './Chat.vue';
    import socket from '../../api/socket';

    export default {
        created() {
        },
        components: {
            chat: ChatComponent
        }
    }
</script>
<style lang="scss">
    .chat {
        height: 30em;
    }
</style>