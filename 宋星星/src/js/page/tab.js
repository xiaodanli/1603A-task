$.ajax({
    url:'api/list',
    dataType:'json',
    success:function(data){
        var str = '';
        data.forEach(function(val){
            str += '<div class="swiper-slide slide2"><img src="'+ val.img +'"></div>';
            $('.bWrap').html(str);
            var boxSwiper = new Swiper('.box');
            var bSwiper = new Swiper('.banner', {
                pagination: {
                    el:'.page',
                    type:'bullets'
                },
                autoplay:true
            });
        });
    }
});
