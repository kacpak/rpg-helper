<template>
    <div class="game-master-panel">
        <div class="row">
            <div class="panel col-md-5">
                <h2>Panel</h2>
                <div class="list-group">
                    <router-link :to="{ name: 'session/admin/invite' }" class="list-group-item list-group-item-action" active-class="active">
                        <i class="fa fa-user-plus fa-fw"></i>&nbsp;Zaproś użytkownika
                    </router-link>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-pencil fa-fw"></i>&nbsp;Edytuj dane sesji
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-key fa-fw"></i>&nbsp;Dodaj przedmioty
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-bolt fa-fw"></i>&nbsp;Dodaj umiejętności
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-magic fa-fw"></i>&nbsp;Dodaj umiejętności magiczne
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-user fa-fw"></i>&nbsp;Modyfikuj karty postaci
                    </a>
                </div>
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
    import ChatComponent from '../../../../components/Chat.vue';

    export default {
        computed: {
            session() {
                return this.$store.state.sessions.current;
            }
        },
        components: {
            chat: ChatComponent
        }
    }
</script>
<style lang="scss" scoped>
    .chat {
        height: 20em;
    }

    .inner-panel {
        margin-top: 2rem;
    }
</style>