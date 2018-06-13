require(["jquery","render"],function($,render) {
	console.log("Ok")
	function init() {
		$.ajax({
			url:"/api/list",
			dataType:"json",
			success:function(res) { 
				render(res.lists,$("#tpl"),$(".prod ul"))
			},
			error:function(error) {
				console.warn(error);
			}
		})
	}
	init();
})