require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: "/api/list",
        dataType: "json",
        success: function(data) {
            var sours = $('#entry').html();
            var template = handlebars.compile(sours);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            });
            handlebars.registerHelper('limit', function(index, option) {
                if (index < 5) {
                    return option.fn(this)
                } else {
                    return option.inverse(this)
                }
            });
            var html = template(data);
            $('.main').append(html);

        }
    })
})