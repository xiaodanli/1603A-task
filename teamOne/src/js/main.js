var mySwiper = new Swiper('.bigSwiper', {
    on: {
        slideChange: function() {
            var idx = this.activeIndex;
            $('footer .foot dl').eq(idx).addClass('click').siblings().removeClass('click');
            console.log(idx);
            $('#ul>li').eq(idx).addClass('active');
            $('#ul>li').eq(idx).siblings().removeClass('active');
        }
    }
});
$('footer .foot').on('click', 'dl', function() {
    var idx = $(this).index();
    mySwiper.slideTo(idx);
    $(this).addClass('click').siblings().removeClass('click');
})

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