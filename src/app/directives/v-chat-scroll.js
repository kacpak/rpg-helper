import Vue from 'vue';

const scrollToBottom = el => {
    el.scrollTop = el.scrollHeight;
};

Vue.directive('chat-scroll', {
    bind: (el, binding) => {
        let timeout;
        let scrolled = false;

        el.addEventListener('scroll', () => {
            if (timeout) window.clearTimeout(timeout);
            timeout = window.setTimeout(function() {
                scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
            }, 200);
        });

        (new MutationObserver(e => {
            let config = binding.value || {};
            let pause = config.always === false && scrolled;
            if (pause || e[e.length - 1].addedNodes.length != 1) return;
            scrollToBottom(el);
        })).observe(el, {childList: true});
    },
    inserted: scrollToBottom
});
