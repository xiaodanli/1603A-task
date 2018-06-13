require(['jquery', 'swiper'], function($, swiper) {
    $.ajax({
        url: '/carous',
        dataType: 'json',
        success: function(data) {
            for (var i in data) {
                $.each(data[i], function(index, value) {
                    var html = ''
                    $.each(value, function(inx, val) {
                        html += "<li class='li swiper-slide'>"
                        $.each(val.list, function(i, v) {
                            html += `
                                    <dl>
                                        <dt><i class="${v.url}"></i></dt>
                                        <dd>${v.characters}</dd>
                                    </dl>
                                    `
                        })
                        html += '</li>'
                    })
                    $('.list').html(html)
                })
            }
            new swiper('.banner', {
                pagination: {
                    el: '.ol',
                    clickable: true
                }
            })
        },
        error: function(error) {
            console.warn(error)
        }
    })
})