<template>
    <div class="chat">
        <div class="messages" v-chat-scroll="{always: false}">
            <div class="card card-outline-secondary m-2" v-for="message in messages">
                <div class="card-block p-2">
                    <span class="font-weight-bold" v-if="message.user.character">@{{ message.user.character.name }}</span>
                    <span class="font-weight-bold" v-else>@<span class="gm">GM</span></span>
                    {{ message.message }}
                </div>
            </div>
        </div>
        <form @submit.prevent="sendMessage">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-comments-o fa-fw"></i></span>
                <input type="text" class="form-control" :placeholder="$t('chat.messagePlaceholder')" v-model="message" v-focus>
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit" v-text="$t('chat.send')" :disabled="!message.length"></button>
                </span>
            </div>
        </form>
    </div>
</template>
<script>
    import {getSocket} from '../api/socket';
    import {ADD_MESSAGE, SET_MESSAGES} from '../store/mutation-types';

    export default {
        props: ['id'],
        data() {
            return {
                message: ''
            }
        },
        created() {
            this.socket = getSocket('chat', {
                room: 'chat',
                session_id: parseInt(this.id, 10)
            });
            this.socket
                .on('chat', messages => this.$store.commit(SET_MESSAGES, messages))
                .on('chat/message', message => this.$store.commit(ADD_MESSAGE, message));
        },
        beforeDestroy() {
            this.socket.disconnect();
            console.info('Chat socket disconnected');
        },
        computed: {
            messages() {
                return this.$store.state.chat.messages;
            }
        },
        methods: {
            sendMessage() {
                this.socket.emit('chat/message', this.message);
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
        height: 100%;

        .gm {
            color: #ff6d00; // orange darken-4 // TODO: move to color pallete
        }
    }
}
</style>