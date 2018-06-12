require(['jquery'], function($) {
    $.ajax({
        'url': '/listTop',
        dataType: 'json',
        success: function(list) {
            var str = ''
            list.forEach(function(v, i) {
                str += ` <dl>
                    <dd>
                    ${v.titl}
                    </dd>
                    <dt><img src="${v.img}" alt=""></dt>
                    </dl>`
            });
            $('.list-top').html(str)

        }
    })
})