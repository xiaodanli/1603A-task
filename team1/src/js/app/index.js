require(['jquery', 'swiper'], function($, swiper) {
    var swiper = new swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
    });
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(res) {
            // console.log(res);
            res.swiperList.forEach(function(file, i) {
                var str = '';
                file.slide.forEach(function(v) {
                    str += ` <dl>
                             <dt><i class="iconfont ${v.class}"></i></dt>
                             <dd>${v.name}</dd>
                          </dl>`
                })
                $('.swiper-slide').eq(i).html(str);
            });
            // var set = '';
            // res.forEach(function(element) {
            //     set += ` <dl>
            //                 <dt><i class="iconfont ${element.class}"></i></dt>
            //                 <dd>${element.name}</dd>
            //              </dl>`
            //     $('.swiper-slide').html(set);
            // });
        },
        error: function(error) {
            console.log(error)
        }
    })
})