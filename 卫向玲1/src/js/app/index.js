require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/index',
        dataType: 'json',
        success: function(res) {
            console.log(res)
                //获取模板
            var tpl = $('#address').html();
            //预编译
            var template = handlebars.compile(tpl);

            handlebars.registerHelper("addIndex", function(index) {
                return index + 1

            })
            handlebars.registerHelper("limit", function(index, opition) {
                if (index < 5) {
                    //符合条件的
                    return opition.fn(this)
                } else {
                    //不符合条件的
                    return opition.inverse(this)
                }

            })


            var html = template(res)
            $('#uls').html(html)
        }
    })
})