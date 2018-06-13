define(['jquery','handlebars'],function($,handlebars){
    function render(source,target,data){
        // 1、获取handlebars模块
        var tpl = $(source).html();
        // 2、预编译模块
        var template = handlebars.compile(tpl);

        // 注册帮助
        handlebars.registerHelper('addIndex',function(index){
            return index + 1;
        })
        // 限制条数
        handlebars.registerHelper('limit',function(index,options){
            if(index < 5){
                return options.fn(this)
            }else{
                return options.inverse(this)
            }
        })
        // 3、传入数据
        var html = template(data);
        // 4、渲染数据
        $(target).html(html);
    }
    return render;
}) 