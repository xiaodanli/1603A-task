$(function() {
    $.ajax({
        url: '/list',
        dataType: 'json',
        success: function(data) {
            var str = '';
            data.forEach(function(file, index) {
                str += `<div class="swiper-slide"><img src="${file.url}" alt=""></div>`;
            });
            $('.swiper-wrapper').append(str);
            new Swiper('.swiper-container', {
                autoplay: 2000
            });

        },
        error: function() {
            console.warn('error!')
        }
    });

});