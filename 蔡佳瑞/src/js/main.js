require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'libs/jquery',
        handlebars: 'libs/handlebars-v4.0.11',
        index: 'app/index'
    }
});
document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px';