<template>
    <div class="session">
        <router-link :to="{ name: session.is_game_master ? 'session/admin' : 'session', params: {id: session.id}}">
            <div class="title" v-text="session.name"></div>
            <div class="description" v-text="session.description"></div>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: ['session']
    }
</script>

<style lang="scss" scoped>
    @import "../styles/_variables";

    .session {
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