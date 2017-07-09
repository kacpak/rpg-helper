<template>
    <div class="character">
        <h3 class="flex-parted header">
            <span>{{ character.name }}</span>
            <small class="status" :class="{'text-success': character.status == 1, 'text-danger': character.status == 0, 'text-warning': character.status > 1}">
                {{ $t(`character.status[${character.status}]`) }}
            </small>
        </h3>
        <div class="flex-row">
            <div class="attribute">
                <div class="attribute__value" v-text="character.race"></div>
                <div class="attribute__label" v-text="$t('character.basic.race')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.character }}</div>
                <div class="attribute__label" v-text="$t('character.basic.character')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.deity }}</div>
                <div class="attribute__label" v-text="$t('character.basic.deity')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.sex }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.sex')"></div>
            </div>
        </div>
        <div class="flex-row">
            <div class="attribute">
                <div class="attribute__value">{{ character.age }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.age')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.size }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.size')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.height }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.height')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.weight }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.weight')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.eyes }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.eyes')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.hair }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.hair')"></div>
            </div>
            <div class="attribute">
                <div class="attribute__value">{{ character.skin }}</div>
                <div class="attribute__label" v-text="$t('character.appearance.skin')"></div>
            </div>
        </div>

        <div class="stats">
            <h4 class="header">Stats</h4>

            <div class="stat">
                <div class="stat__label" v-text="$t('character.experience')"></div>
                <div class="stat__value" v-text="character.experience"></div>
            </div>
            <div class="stat">
                <div class="stat__label" v-text="$t('character.attributes.strength')"></div>
                <div class="stat__value" v-text="character.strength"></div>
            </div>
            <div class="stat">
                <div class="stat__label" v-text="$t('character.attributes.constitution')"></div>
                <div class="stat__value" v-text="character.constitution"></div>
            </div>
            <div class="stat">
                <div class="stat__label" v-text="$t('character.attributes.dexterity')"></div>
                <div class="stat__value" v-text="character.dexterity"></div>
            </div>
            <div class="stat">
                <div class="stat__label" v-text="$t('character.attributes.intelligence')"></div>
                <div class="stat__value" v-text="character.intelligence"></div>
            </div>
            <div class="stat">
                <div class="stat__label" v-text="$t('character.attributes.wisdom')"></div>
                <div class="stat__value" v-text="character.wisdom"></div>
            </div>
            <div class="stat">
                <div class="stat__label" v-text="$t('character.attributes.charisma')"></div>
                <div class="stat__value" v-text="character.charisma"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['character']
    }
</script>

<style lang="scss" scoped>
    .status {
        font-variant: all-petite-caps;
    }

    .flex-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin: 0 -.7em;
    }

    .attribute {
        & {
            display: flex;
            flex-direction: column;
            margin: .2em .7em;
        }

        &__value {
            font-weight: bold;
        }

        &__label {
            user-select: none;
            border-top: 1px solid #333;
            text-align: right;
            font-size: .8em;
            line-height: 1em;
            font-variant: all-petite-caps;
        }
    }

    .stats {
        margin-top: 3em;
    }

    .stat {
        & {
            display: flex;
        }

        &__label {
            min-width: 10em;
            font-variant: all-petite-caps;
        }

        &__value {
            font-weight: bold;
        }
    }

</style>