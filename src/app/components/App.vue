<template>
    <div class="app">
        Hello {{ username }} in RPG Helper
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: ''
            }
        },
        created() {
            this.$http.post('/auth/login')
                .then(response => response.json())
                .then(json => this.username = json.username);
        }
    }
</script>