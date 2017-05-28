<template>
    <div class="session">
        Session id: <strong>{{ $route.params.id }}</strong>
    </div>
</template>
<script>
    import socketIo from 'socket.io-client';

    export default {
        created() {
            const socket = socketIo();
            socket.on('connect', () => {
                console.log('Socket connected');
                socket
                    .emit('authenticate', { token: this.$store.state.account.token })
                    .on('authenticated', () => {
                        console.log('Socket authenticated');
                    })
                    .on('unauthorized', msg => {
                        console.error('Socket unauthorized', msg.data);
                        throw new Error(msg.data.type);
                    })
            });
        }
    }
</script>
<style lang="sass">

</style>