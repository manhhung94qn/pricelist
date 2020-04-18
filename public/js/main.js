Vue.directive('money', {
    bind: function(el, binding) {
        el.innerHTML = (+el.innerHTML).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    },

    update: function(el, binding) {
        el.innerHTML = (+binding.value).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    },
})