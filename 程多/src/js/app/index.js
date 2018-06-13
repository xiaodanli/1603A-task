require(["jquery","handlebars"],function($,handlebars){
    $.ajax({
        url:"/api/swiper",
        dataType:"json",
        success:function(res){
            var tpl=$("#tpl").html();
           var template=handlebars.compile(tpl)
           handlebars.registerHelper("addindex",function(index){
                return index+1
           })
           handlebars.registerHelper("limit",function(index,option){
            if(index<5){
              return option.fn(this)
            }else{
              return option.inverse(this)
            }
           })

           var html=template(res)
           $(".list").html(html)
        },
        error:function(error){
            console.warn(error)
        }
    })
})