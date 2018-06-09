require(["jquery", "swiper"], function($, swiper) {

	function init() {

		var newswiper = new swiper(".main", {
			onSlideChangeStart: function(swiper) {
				change(swiper.activeIndex);
			}
		})

		var lis = document.querySelectorAll(".navs ul li"),
			len = lis.length;
		for (var i =0 ; i < len; i++) {
			lis[i].index = i;
			lis[i].onclick = function() {
				change(this.index)
				newswiper.slideTo(this.index)
			}
		}

		function change(index) {
			for (var i = 0; i < len; i++) {
				lis[i].classList.remove("line");
			}
			lis[index].classList.add("line");
		}

		$.ajax({
			url: "/api/swiper",
			dataType: "json",
			success: function(data) { 
				var str = "";
				data.forEach(function(item, index) {
					str += '<div class="swiper-slide"><img src="' + item.url + '"></div>'
				})
				$(".swiperpic").append(str);
				var onswiper = new swiper(".swiper-container", {
					pagination: ".page"
				})
			},
			error: function(error) {
				console.warn(error)
			}
		})
	}
	init()
})