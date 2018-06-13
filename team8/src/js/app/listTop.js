require(['jquery', 'swiper'], function($, swiper) {
    $.ajax({
        'url': '/listTop',
        dataType: 'json',
        success: function(list) {
            var str = ' '
            list.forEach(function(v, i) {
                str += '<li class="swiper-slide">'
                v.list.forEach(function(value, index) {
                    str += `
                   <dl>
                   <dt><img src="${value.img}" alt=""></dt>
                   <dd>${value.titl}</dd>
               </dl>
                   `
                })
                str += '</li>'
            });
            $('.top-wrap').html(str);
            new swiper('.top-cont', {
                autoplay: 2000,
                pagination: {
                    el: '.swiper-pagination',
                },
            })
        }
    })
})