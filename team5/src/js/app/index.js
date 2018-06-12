require(['jquery', 'swiper'], function($, swiper) {
    new swiper('.swiper-container', {
        autoplay: 3000,
        pagination: {
            el: '.swiper-pagination'
        }
    });
    $.ajax({
        url: '/api/server',
        dataType: 'json',
        success: function(res) {
            render(res);
        },
        error: function(error) {
            console.warn(error)
        }
    })

    function render(res) {
        res.forEach(function(item, i) {
            $(`<li><i class="${item.name}"></i>${item.val}</li>`).appendTo($('.ull'));
        })
    }
})