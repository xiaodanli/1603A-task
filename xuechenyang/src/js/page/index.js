$(function() {
    $.ajax({
        url: "/list/api",
        dataType: "json",
        success: function(data) {
            console.log(data)
            var str = '';
            data.forEach(function(v, i) {
                str += '<div class="swiper-slide"><img src="' + v.url + '" alt=""></div>'
            });
            $(".swiper-wrapper").html(str)
            new Swiper('.swiper-container')
        },
        error: function(error) {
            console.warn(error)
        }
    })
})