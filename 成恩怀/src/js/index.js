$(function() {
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(data) {
            console.log(data)
            var arr = '';
            data.forEach(function(val, index) {
                arr += `<li class="swiper-slide"><img src="${val.url}"></li>`;
            })

            $(".list").html(arr);
            new Swiper(".wrap", {
                autoplay: 3000
            })
        }
    })
})