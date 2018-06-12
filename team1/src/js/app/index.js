require(['jquery', 'swiper'], function($, swiper) {
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(res) {
            console.log(res);
        },
        error: function(error) {
            console.log(error)
        }
    })
})