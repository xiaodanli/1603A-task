define(["handlebars", "jquery"], function(hand, $) {
    function render(data, source, target) {
        var sou = source.html();
        var template = hand.compile(sou);
        hand.registerHelper("addIndex", function(index) {
            return index + 1;
        });
    
        hand.registerHelper("limit", function(param, options) {
            if (param < 5) { //只显示前五条数据
                return options.fn(this);
            } else {
                return options.inverse(this); //不符合条件的
            }
        })
        var html = template(data);
       
        target.append(html);
    }
    return render;
})