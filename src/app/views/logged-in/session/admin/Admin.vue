<template>
    <div class="game-master-panel" :class="{ open: !isMainView }">
        <div class="main">
            <div class="nav-panel">
                <h2 v-text="$t('admin.panel.title')"></h2>
                <div class="list-group">
                    <list-link :toName="'session/admin/invite'" :toFallback="'session/admin'" :iconClass="'fa-user-plus'">
                        {{ $t('admin.panel.inviteUser') }}
                    </list-link>
                    <list-link :toName="'session/admin/editSessionDetails'" :toFallback="'session/admin'" :iconClass="'fa-pencil'">
                        {{ $t('admin.panel.editSessionDetails') }}
                    </list-link>
                    <list-link :toName="'session/admin/editSessionDetails'" :toFallback="'session/admin'" :iconClass="'fa-pencil'">
                        {{ $t('admin.panel.editSessionDetails') }}
                    </list-link>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-key fa-fw"></i>&nbsp;{{ $t('admin.panel.modifyItems') }}
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-bolt fa-fw"></i>&nbsp;{{ $t('admin.panel.modifySkills') }}
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-magic fa-fw"></i>&nbsp;{{ $t('admin.panel.modifyMagic') }}
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <i class="fa fa-user fa-fw"></i>&nbsp;{{ $t('admin.panel.modifyCharacters') }}
                    </a>
                </div>
            </div>
            <div class="chat-container">
                <h2 v-text="$t('admin.chat.title')"></h2>
                <chat :id="session.id"></chat>
            </div>
        </div>
        <router-view class="content"></router-view>
    </div>
</template>
<script>
    import store from '../../../../store/index'
    import ChatComponent from '../../../../components/Chat.vue';
    import ListGroupLinkComponent from '../../../../components/ListGroupLink.vue';

    export default {
        computed: {
            session() {
                return this.$store.state.sessions.current;
            },
            isMainView() {
                return this.$route.name === 'session/admin';
            }
        },
        components: {
            chat: ChatComponent,
            listLink: ListGroupLinkComponent
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../../styles/variables";
    $side-panel-width: 40%;
    $two-pane-breakpoint: map_get($container-max-widths, sm);

    .chat {
        height: 20em;
    }

    .main {
        & { display: flex; }
        @media (max-width: $two-pane-breakpoint) {
            flex-direction: column;
        }

        .chat-container { flex: 1; }

        @media (min-width: $two-pane-breakpoint) {
            .nav-panel { width: $side-panel-width }
        }
    }

    .main > *, .content {
        padding: $grid-gutter-width-base / 2;
    }

    .open {
        & { display: flex; }

        @media (max-width: $two-pane-breakpoint) {
            flex-direction: column;
        }
        .main {
            & {
                flex-direction: column;

                @media (min-width: $two-pane-breakpoint) {
                    width: $side-panel-width;
                }
            }
            .nav-panel { width: 100%; }
        }
        .content { flex: 1; }
    }
</style>