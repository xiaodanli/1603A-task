require(['jquery', 'swiper'], function($, swiper) {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
    });
    $.ajax({
        url: '/app/swiper',
        dataType: 'json',
        success: function(res) {
            var str = '';
            res.forEach(function(data) {
                str += ` <dl>
                                    <dt><i class=" icon iconfont ${data.class}"></i></dt>
                                   <dd>${data.name}</dd>
                             </dl>`
                $('.swiper-slide').html(str);
            });
        },
        error: function(error) {
            console.log(error)
        }
    })
})