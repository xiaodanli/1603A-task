var sum = 0;
$('.list li').each(function(i, v) {
    sum += $(this).outerWidth(true);
})
sum += $('.list span').outerWidth(true);
$('.list').width(sum);

var myscroll = new IScroll('.nav', {
    scrollX: true,
    scrollY: false
});
$('.list li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    var tag = $('.list li').eq(index)[0];
    myscroll.scrollToElement(tag, 100, true, 0);
})

$('dl').on('click', function() {
    var index = $(this).index();
    console.log(index);
    $(".all>div").eq(index).css("display", 'block').siblings().css('display', 'none');
    $(this).css("color", "red").siblings().css("color", "#000");
})