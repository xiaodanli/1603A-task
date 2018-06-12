require(['jquery', 'swiper'], function($, swiper) {
    $.ajax({
        url: '/carous',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, value) {
                var html = ''
                $.each(value.item_1, function(inx, val) {
                    html += `
                        <dl>
                            <dt><i class="${val.url}"></i></dt>
                            <dd>${val.characters}</dd>
                        </dl>
                    `
                })
                $('.list li:eq(0)').html(html)
            })
            $.each(data, function(index, value) {
                var html = ''
                $.each(value.item_2, function(inx, val) {
                    html += `
                        <dl>
                            <dt><i class="${val.url}"></i></dt>
                            <dd>${val.characters}</dd>
                        </dl>
                    `
                })
                $('.list li:eq(1)').html(html)
            })
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