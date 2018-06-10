$(function(){
    $.ajax({
        url:'/mock',
        dataType:'json',
        success:function(data){
            console.log(data);
            render(data)
        },
        error:function(err){
            console.log(err)
        }
    })
})
function render(json){
    var str = '';
    json.forEach(function(file){
        str += `<p>${file.name}</p>
                <p>${file.title}</p>`
    });
    $('.box').html(str);
}