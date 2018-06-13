define([// 定义模块
    'jquery',
    'handlebars'
], function($,handlebars ) {
    function render(source,target,data){
        var tql = $(source).html();// 获取handlebars模板
        var template = handlebars.compile(tql);// 进行编译
        handlebars.registerHelper('addIndex', function (index){// 注册帮助index+1
            return index + 1;
        })
        handlebars.registerHelper('limit', function (param,option){// 注册帮助limit
            if(param < 3){
                return option.fn(this);
            }else{
                return option.inverse(this)
            }
        })
        var html = template(data);// 接收并返回数据
        $(target).html(html); // 写入html
    }
    return render;// 返回数据
    
});