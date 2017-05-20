<template>
    <div class="app">
        Hello from app-component {{ msg }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'hey'
            }
        }
    }
</script>