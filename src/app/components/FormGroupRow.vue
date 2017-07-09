<template>
    <div class="form-group row" :class="{'has-danger': errors.has(name)}">
        <label :for="id || name" class="col-sm-2 col-form-label" v-text="label"></label>
        <div class="col-sm-10">
            <input type="text" class="form-control" :placeholder="placeholder || label"
                   :id="id || name" :name="name"
                   :value="value"
                   ref="input"
                   @input="update()"
                   v-validate="validate"
                   v-focus="focused">
            <div v-if="errors.has(name)" class="form-control-feedback" v-text="errors.first(name)"></div>
        </div>
    </div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            value: {},
            label: {
                type: String,
                required: true
            },
            placeholder: {
                type: String
            },
            id: {
                type: String
            },
            name: {
                type: String,
                required: true
            },
            focused: {
                type: Boolean,
                default: false
            },
            validate: {
                type: String,
                default: ''
            }
        },
        methods: {
            update() {
                this.$emit('input', this.$refs.input.value);
            }
        }
    }
</script>