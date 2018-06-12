require(['jquery', 'swiper'], function($, Swiper) {
    $.ajax({
        url: '/data',
        datatype: 'json',
        sucess: function(data) {
            console.log(data)
        }
    })
})