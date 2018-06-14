require.config({

    baseUrl: '../js',
    paths: {
        'jquery': 'jquery',
        'handlebars': 'handlebars',
        'ajaxs': 'module_ajax',
        'hand': 'module_hand'
    }
})
require(['ajaxs', "hand"]);