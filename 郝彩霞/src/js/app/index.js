require(['jquery', 'handlebars'], function($, Handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json', //设置类型
        success: function(data) {

            var tpl = $('#tpl').html();
            var template = Handlebars.compile(tpl);
            //设置下标
            Handlebars.registerHelper('addIndex', function(index) {
                return index + 1;
            });
            //截取数量
            Handlebars.registerHelper('limit', function(param, option) {
                if (param < 6) { //如果小于6则显示
                    return option.fn(this)
                } else {
                    return option.inverse(this)
                }
            })
            var obj = template(data);
            $('#list').html(obj); //追加内容
        }
    })
})