import Vue from 'vue';

Vue.directive('focus', {
    inserted: (el, binding) => {
        if (binding.value != false) {
            el.focus();
        }
    },
});
