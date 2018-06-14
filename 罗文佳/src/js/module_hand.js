define(['jquery', 'handlebars'], function($, Handlebars) {

    function render(tplId, eleId, data, flag) {
        var source = tplId.html();

        var template = Handlebars.compile(source);

        if (flag) {
            Handlebars.registerHelper('addind', function(ind) {
                return ind + 1
            });

            Handlebars.registerHelper('reach', function(max, options) {
                if (max < 5) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });

        }
        var html = template(data);

        eleId.html(html);
        // console.log(data);
    }
    return {
        render: render
    }
});