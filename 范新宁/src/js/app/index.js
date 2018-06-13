require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/list',
        success: function(res) {
            var res = JSON.parse(res);
            render('#tpt', '#list', res)
        },
        error: function() {
            console.log('error')
        }
    })
})