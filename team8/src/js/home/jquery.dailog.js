;
(function($) {
    $.fn.extend({
        "dailog": function(opt) {
            var dft = {
                title: "警告弹框"
            }
            var data = $.extend({}, dft, opt);
            var html = `
                        <div class="mask">
                            <div class="list">
                                <h2>${data.title}</h2>
                                <input type="button" value="确定" id="success">
                            </div>
                        </div>`;
            return $.each(function() {
                $(this).append(html);
            });
        }
    })
})(jQuery);