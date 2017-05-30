<template>
    <div class="dashboard p-2">
        <header class="d-sm-flex align-items-center">
            <h2 class="mr-auto">Dashboard</h2>
            <router-link :to="{ name: 'new-session' }" class="btn btn-primary" role="button">Nowa sesja</router-link>
        </header>
        <h3>Aktywne sesje</h3>
        <ul class="sessions-list">
            <li v-for="session in activeSessions">
                <router-link :to="{ name: 'session', params: {id: session.id}}">
                    <div class="title">{{ session.name }}</div>
                    <div class="description">{{ session.description }}</div>
                </router-link>
            </li>
        </ul>
        <h3>Ukończone sesje</h3>
        <ul class="sessions-list">
            <li v-for="session in finishedSessions">
                <router-link :to="{ name: 'session', params: {id: session.id}}">
                    <div class="title">{{ session.name }}</div>
                    <div class="description">{{ session.description }}</div>
                </router-link>
            </li>
        </ul>
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

.sessions-list {
    & {
        display: flex;
        list-style: none;
        padding: 0;
    }

    > li {
        & {
            margin: 1em;
            width: 12em;
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
}
</style>