require(["jquery", "render"], function($, render) {
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(res) {
            render('#tpl', "#list", res)
        }
    })
})