$(function() {
    $.ajax({
        type: "get",
        url: "/api/list",
        dataType: "json",
        success: function(data) {
            render(data)
        },
        error: function(err) {
            console.log(err)
        }
    });

    function render(res) {
        var str = ''
        res.forEach(item => {
            str += '<div class="swiper-slide"> <img src="' + item.url + '"> </div>'

        });
        $(".swiper-wrapper").html(str)
        new Swiper(".swiper-container", {
            autoplay: 3000
        })
    }
})