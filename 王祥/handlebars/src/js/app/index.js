define(['jquery', 'handlebars'], function($, handlebars) {
    const html = $('.text').html(),
        tem = handlebars.compile(html);

    $.get('app/text', function(data) {
        var data = JSON.parse(data)
        handlebars.registerHelper('appindex', function(app, Option) {
            if (app < 5) {
                return Option.fn(this)
            } else {
                return Option.inverse(this)
            }
        })
        $('.box').append(tem(data))


    })
})