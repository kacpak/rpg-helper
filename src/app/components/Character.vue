<template>
    <div class="character">
        <h3>
            {{ character.name }}
            <small :class="{'text-success': character.status == 1, 'text-danger': character.status == 0, 'text-warning': character.status > 1}">
                {{ $t(`character.status[${character.status}]`) }}
            </small>
        </h3>
        <strong>{{ $t('character.experience') }}</strong> {{ character.experience }}
    </div>
</template>
<script>
    export default {
        props: ['character']
    }
</script>