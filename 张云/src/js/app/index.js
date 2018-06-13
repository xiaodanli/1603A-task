require(['jquery','render'],function($,render){
    $.ajax({
        url:'/api/list',
        dataType:'json',
        success:function(res){
            console.log(res)
           
            render('#tpl','ul',res);
        },
        error:function(error){
            console.log(error)
        }
    })
})