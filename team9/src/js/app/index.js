require(['jquery', 'swiper'], function($, Swiper) {
    $.ajax({
        url: '/data',
        dataType: 'json',
        success: function(data) {
            var str = ''
            data.map(function(file) {
                str += `<dl>
                <dt><img src="images/${file.img}" alt=""></dt>
                <dd>
                    <h2>${file.title}</h2>
                    <p>${file.text}</p>
                </dd>
            </dl>`
            })
            $('.cream').html(str)

        }
    })
    new Swiper('.swiper-container', {
        pagination: { el: '.swiper-pagination' }
    })
})