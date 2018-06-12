require(['jquery', 'swiper'], function($, swiper) {
    $.ajax({
        url: '/index',
        dataType: 'json',
        success: function(res) {
            var json = '';
            res.data.forEach(function(file) {
                json += `<li><img src="${file.url}" alt=""><p>${file.text}</p></li>`;
            })
            $('.uls').append(json);
            $('#spn1').css('background', 'red');
            var jsons = '';
            res.datas.forEach(function(file) {
                jsons += `<li><img src="${file.url}" alt=""><p>${file.text}</p></li>`;
            })
            $('.ulas').append(jsons);
            $('.ulas').hide();
        }
    })
    $('#spn1').on('click', function() {
        $('.uls').show();
        $('.ulas').hide();
        $(this).css('background', 'red');
        $('#spn2').css('background', '#fff');
    })
    $('#spn2').on('click', function() {
        $('.ulas').show();
        $('.uls').hide();
        $(this).css('background', 'red');
        $('#spn1').css('background', '#fff');
    })
})