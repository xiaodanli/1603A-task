//主模块
require(["jquery", "handlebars", "template"], function($, handlebars, template) {
    $.ajax({
        url: '/api/list',
        datatype: 'json',
        success: function(data) {
            // console.log(JSON.parse(data));
            template('#tpl', data, "#ul")
        }
    })
})