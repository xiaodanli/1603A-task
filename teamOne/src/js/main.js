var mySwiper = new Swiper('.bigSwiper', {

});

var scroll = new BScroll('.one', {
    click: true,
    scrollX: true,
    scrollY: false
});
var ul = document.getElementById('ul');
var lis = ul.querySelectorAll('#ul>li');
var sum = 0;
lis.forEach(function(item, i) {
    sum += item.offsetWidth + 21;
})
ul.style.width = sum / 100 + "rem";
$('.roll li').on('tap', function() {
    var index = $(this).index();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    scroll.scrollToElement(this, 500, true, 0);
    mySwiper.slideTo(index);
});
$('.classify').on('tap', function() {
    alert('亲！这是低配唯品会，咱无分类项。')
})

var smallSwiper = new Swiper('.smallSwiper', {
    loop: 1,
    autoplay: true
});