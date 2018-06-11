$(function(){
	$.ajax({
		url:'/api/swiper',
		dataType:'json',
		success:function(res){
			console.log(res);
			render(res);
		},
		error:function(error){
			console.warn(error)
		}
	})

	function render(res){
		var str = '';

		res.forEach(function(item,index){
			str += `<div class="swiper-slide"><img src="${item.url}"></div>`;
		})

		console.log(str);
		$(".swiper-wrapper").html(str);
		new Swiper(".swiper-container",{
			autoplay:3000
		})
	}
})