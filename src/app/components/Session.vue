<template>
    <div class="session">

    </div>
</template>
<script>
    import socketIo from 'socket.io-client';

    export default {
        created() {
            const socket = socketIo();
            socket.on('connect', () => console.log('Connected', socket.id));
        },
    }
</script>
<style lang="sass">

</style>