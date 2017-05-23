<template>
    <div class="dashboard">
        <h2>Dashboard</h2>
        <ul>
            <li>Rozpocznij nową sesję</li>
            <li>Zaproszenia</li>
        </ul>
        <h3>Aktywne sesje</h3>
        <ul>
            <li>D&D Kamyk</li>
        </ul>
    </div>
</template>
<script>
    import store from '../store';

    export default {
        beforeRouteEnter(to, from, next) {
            if (store.state.account.user === null) {
                return next({ name: 'login' })
            }
            return next()
        }
    }
</script>
<style lang="scss">

</style>