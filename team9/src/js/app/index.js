require(['jquery', 'swiper'], function($, Swiper) {
    $.ajax({
        url: '/data',
        dataType: 'json',
        success: function(data) {
            var json = '';
            data.swiperList.forEach(function(file, index) {
                json += `<li class="swiper-slide dl">`;
                file.slide.forEach(function(files, index) {
                    json += `<dl>
                    <dt><i class="icon iconfont ${files.class}"></i></dt>
                    <dd>${files.name}</dd>
                </dl>`
                    console.log(files)
                })
                json += `</li>`;
            })
            $('.swiper-wrapper').append(json);
        }
    })
    new Swiper('.swiper-container', {
        pagination: { el: '.swiper-pagination' }
    })
})