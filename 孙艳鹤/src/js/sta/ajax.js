$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            var str = ''
            res.map(function(file) {
                str += `<div class="swiper-slide">
                <img src="${file.url}" alt="">
            </div>`
            })
            $('.lop').html(str)
            new Swiper('.top', {
                autoplay: true
            })
        }
    })
})