<template>
    <div class="dashboard p-2">
        <header class="d-sm-flex align-items-center">
            <h2 class="mr-auto">{{ $t('dashboard.title') }}</h2>
            <router-link :to="{ name: 'session/create' }" class="btn btn-primary" role="button">{{ $t('dashboard.createNewSession') }}</router-link>
        </header>
        <h3>{{ $t('dashboard.activeSessions') }}</h3>
        <div class="sessions-list row">
            <div v-for="session in activeSessions" class="col-md-3">
                <div class="session">
                    <router-link :to="{ name: session.is_game_master ? 'session/admin' : 'session', params: {id: session.id}}">
                        <div class="title">{{ session.name }}</div>
                        <div class="description">{{ session.description }}</div>
                    </router-link>
                </div>
            </div>
        </div>
        <h3>{{ $t('dashboard.finishedSessions') }}</h3>
        <div class="sessions-list row">
            <div v-for="session in finishedSessions" class="col-md-3">
                <div class="session">
                    <router-link :to="{ name: session.is_game_master ? 'session/admin' : 'session', params: {id: session.id}}">
                        <div class="title">{{ session.name }}</div>
                        <div class="description">{{ session.description }}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            activeSessions() {
                return this.$store.getters['sessions/active'];
            },
            finishedSessions() {
                return this.$store.getters['sessions/finished'];
            }
        },
        created() {
            this.$store.dispatch('sessions/fetchAll')
                .catch(console.error);
        }
    }
</script>
<style lang="scss">
@import "../../styles/variables";

.sessions-list .session {
    & {
        margin: $grid-gutter-width-base/2 0;
        min-height: 6em;
        border: 1px solid $btn-secondary-border;
        border-radius: $border-radius;
    }

    > a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 1em;
        text-decoration: none;
    }

    .title {
        font-weight: bold;
    }

    .description {
        font-size: .8em;
    }
}
</style>