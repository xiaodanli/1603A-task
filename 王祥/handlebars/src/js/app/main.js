require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'lib/jquery',
        'handlebars': 'lib/handlebars-v4.0.11',
        'index': 'app/index'
    }
})
document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px';