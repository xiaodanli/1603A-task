define(['jquery', 'swiper'], function($, swiper) {
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    })
})