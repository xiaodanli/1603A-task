define(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/app/list',
        success: function(rs) {
            render('#render', '#list', rs)
        },
        error: function(err) {
            console.warn(err)
        }
    })
})