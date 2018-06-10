$(function() {
    $.ajax({
        url: '/url',
        dataType: 'json',
        success: function(data) {
            var str = '';
            data.forEach(function(file) {

                str += `<div class="swiper-slide"><img src="${file.url}" alt=""></div>`
            })
            $('.swiper-wrapper').html(str);
            new Swiper('.swiper-container');
        }

    })

})