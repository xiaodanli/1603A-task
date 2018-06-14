require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'libs/jquery-1.7.1',
        'handlebars': 'libs/handlebars-v4.0.11',
        'index': 'app/index'
    }
})
require(['index'])