$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            render(res);
        },
        error: function(error) {
            console.warn(error);
        }
    })

    function render(res) {
        res.forEach(function(val, i) {
            $(`<img src="${val.src}" alt="">`).appendTo($('.box'));
        })
    }
})