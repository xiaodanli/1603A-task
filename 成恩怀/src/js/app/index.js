require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: "/api/content",
        dataType: "json",
        success: function(data) {
            var movie = $('#movie').html()
            var template = handlebars.compile(movie)
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            })
            handlebars.registerHelper('judge', function(parms, options) {
                if (parms < 5) {
                    return options.fn(this)
                } else {
                    return options.inverse(this)
                }
            })
            var html = template(data)
            $('.list').html(html)
        },
        error: function(err) {
            console.warn(err)
        }
    })
})