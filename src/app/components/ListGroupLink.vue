<template>
    <router-link
        :to="{ name: $route.name === toName ? toFallback : toName }"
        class="list-group-item list-group-item-action"
        active-class="active">
        <i class="fa fa-fw" :class="iconClass"></i>&nbsp;<slot></slot>
    </router-link>
</template>

<script>
    export default {
        props: {
            toName: {
                type: String,
                required: true
            },
            toFallback: {
                type: String,
                required: true
            },
            iconClass: String
        }
    }
</script>