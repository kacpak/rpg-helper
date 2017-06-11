import Vue from 'vue';

Vue.directive('focus', {
    update: (el) => {
        el.focus();
    },
});
