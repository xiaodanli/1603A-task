require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: "/app/list",
        dataType: "json",
        success: function(res) {
            render('#list', ".list", res)

        },
        error: function(error) {
            console.warn(error)
        }
    });
})