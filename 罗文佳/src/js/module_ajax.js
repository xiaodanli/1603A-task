define(['jquery', 'hand'], function($, hand) {

    $.ajax({
        url: "/login",
        success: function(data) {
            hand.render($('#sectpl'), $('.section'), data, true);
        }
    });

});