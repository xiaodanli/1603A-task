require(['jquery', 'swiper'], function($, swiper) {
    new swiper('.swiper-container', {
        autoplay: 3000,
        pagination: {
            el: '.swiper-pagination'
        }
    });
    $.ajax({
        url: '/api/server',
        dataType: 'json',
        success: function(res) {
            render(res);
        },
        error: function(error) {
            console.warn(error)
        }
    })

    function render(res) {
        var rs = res.swiperdata;
        rs.forEach(function(v, i) {
            var str = '';
            v.list.forEach(function(file, a) {
                str += `<li>
                <i class="${file.name}"></i>
                ${file.val}
                </li>`
            })
            $('.ull').eq(i).html(str)
        })

    }
})