define(["jquery", "handlebars"], function($, handle) {

	function render(data, soucre, tagtar) {
		var soucreTpl = soucre.html();

		var template = handle.compile(soucreTpl);

		handle.registerHelper("addIndex", function(index) {
			return index + 1;
		})

		handle.registerHelper("limit", function(parmal, option) {
			if (parmal < 3) {
				return option.fn(this)
			} else {
				return option.inverse(this)
			}
		})

		var html = template(data);

		tagtar.append(html);
	}
	return render
})