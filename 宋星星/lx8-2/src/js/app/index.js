require(['jquery','render'],function($,render){
    $.ajax({// ajax请求
        url:'/api/list',
        dataType:'json',
        success:function(data){
            // 请求成功渲染handlebars
            render('#tql','.list',data);
        },
        error:function(error){
            console.warn(error);
        }
    })
});