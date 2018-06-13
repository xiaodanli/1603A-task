require(['jquery', 'swiper'], function($, Swiper) {
    $.ajax({
        url: '/index',
        dataType: 'json',
        success: function(res) {
            var json = '';
            res.swiperlist.forEach(function(file, index) {
                json += `<div class="swiper-slide">`;
                file.list1.forEach(function(files, index) {
                    json += `<li><img src="${files.url}" alt=""><p>${files.text}</p></li>`
                    console.log(files)
                })
                json += `</div>`;
            })
            $('.swiper-wrapper').append(json);
            new Swiper('.swiper-container', {
                autoplay: 2000,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        }
    })



})