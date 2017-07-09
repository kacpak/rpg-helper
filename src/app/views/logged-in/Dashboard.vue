<template>
    <div class="dashboard p-2">
        <header class="flex-parted">
            <h2 v-text="$t('dashboard.title')"></h2>
            <router-link :to="{ name: 'session/create' }" class="btn btn-primary" role="button">
                <i class="fa fa-plus" aria-hidden="true"></i>
                {{ $t('dashboard.createNewSession') }}
            </router-link>
        </header>

        <h3 v-text="$t('dashboard.activeSessions')" class="header"></h3>
        <div v-if="activeSessions.length" class="sessions-list row">
            <div v-for="session in activeSessions" class="col-md-3">
                <session-card :session="session"></session-card>
            </div>
        </div>
        <p class="text-muted text-center p-3" v-text="$t('dashboard.noActiveSessions')" v-else></p>

        <div v-if="finishedSessions.length">
            <h3 v-text="$t('dashboard.finishedSessions')" class="header"></h3>
            <div class="sessions-list row">
                <div v-for="session in finishedSessions" class="col-md-3">
                    <session-card :session="session"></session-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SessionCardComponent from '../../components/SessionCard.vue';

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
        },
        components: {
            sessionCard: SessionCardComponent
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/_variables";

    .header {
        margin-bottom: 0;
    }
</style>