require(["jquery", "swiper"], function($, swiper) {
	console.log("Ok");

	function loadswiper() {
		$.ajax({
			url: "/api/swiper",
			dataType: "json",
			success: function(res) {
				var str = "";
				res.data.forEach((item, index) => {
					str += '<a href="javascript:;"><img src="' + item.url + '" alt="" /><span>' + item.s + '</span></a>';
				})
				$(".swiper-slide").append(str);
			},
			error: function(error) {
				console.warn(error);
			}
		})
	}

	new swiper(".swiper-container", {
		pagination: ".page"
	})

	function loadrop() {
		$.ajax({
			url: "/api/prod",
			dataType: "json",
			success: function(res) {
				var str = "",
					str1 = "";
				res.prod.forEach((item, index) => {
					str += '<a href="javascript:;"><h2 class="' + item.color + '">' + item.t + '</h2><span>' + item.s + '</span><img src="' + item.url + '" alt=""></a>'
				})
				$(".content .prod").append(str);

				res.list.forEach((item, index) => {
					str1 += '<li><a href="javascript:;"><dl><dt><img src="' + item.url + '" alt=""></dt><dd><h3>' + item.t + '</h3><p>[7店通用]10元代金券1张，可叠加</p><p class="price"><span class="num"><dfn>' + item.gold + '</dfn>元</span><span class="wm">门市价:' + item.money + '元</span><span class="sell">' + item.sell + '</span></p></dd></dl></a></li>'
				})
				$(".list ul").append(str1);
			},
			error: function(error) {
				console.warn(error);
			}
		})
	}

	function init() {
		loadswiper();
		loadrop();
	}
	init();
})