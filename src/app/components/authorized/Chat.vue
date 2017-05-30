<template>
    <div class="chat">
        <div class="messages" v-chat-scroll="{always: false}">
            <div class="card card-outline-secondary m-2" v-for="message in messages">
                <div class="card-block p-2">
                    <span class="font-weight-bold">@{{ message.sender.login }}</span>
                    {{ message.message }}
                </div>
            </div>
        </div>
        <form @submit.prevent="sendMessage">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Wiadomość..." v-model="message">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">Wyślij</button>
                </span>
            </div>
        </form>
    </div>
</template>
<script>
    import {getSocket} from '../../api/socket';

    export default {
        props: ['id'],
        data() {
            return {
                message: '',
                messages: []
            }
        },
        created() {
            this.socket = getSocket({
                session: {
                    id: parseInt(this.id, 10)
                }
            });
            this.socket
                .on('chat message', msg => {
                    this.messages.push(msg);
                })
                .on('session', messages => this.messages = messages);
        },
        beforeDestroy() {
            this.socket.emit('disconnect');
        },
        methods: {
            sendMessage() {
                this.socket.emit('chat message', this.message);
                this.message = '';
            }
        }
    }
</script>
<style lang="scss">
.chat {
    & {
        display: flex;
        flex-direction: column;
    }
    .messages {
        flex: 1;
        overflow: auto;
        max-height: 20em;
    }
}
</style>