require(['jquery', 'swiper'], function($, swiper) {
    $.ajax({
        'url': '/list',
        dataType: 'json',
        success: function(list) {
            var str = ''
            list.forEach(function(v, i) {
                str += ` <dl>
                    <dt><img src="${v.img}" alt=""></dt>
                    <dd>
                        <h4>${v.titl}</h4>
                        <i>${v.sale}</i>
                        <em>${v.pic}</em>
                    </dd>
                    </dl>`
            });
            $('.list-last').html(str)
        }
    })
    new swiper('.home-page', {
        autoplay: 3000
    })
})