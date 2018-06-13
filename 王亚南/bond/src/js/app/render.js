define(['jquery', 'handlebars'], function($, handlebars) {
    function render(par, target, res) {
        var tpl = $('#tpl').html();

        var template = handlebars.compile(tpl);

        handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        })

        handlebars.registerHelper('limit', function(param, options) {
            if (param < 5) {
                // 符合条件
                return options.fn(this);
            } else {
                // 不符合条件
                return options.inverse(this);
            }
        })

        var html = template(res);

        $('#list').html(html);
    }

    return render;
})