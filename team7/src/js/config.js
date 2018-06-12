require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "libs/jquery-2.1.1.min",
        "swiper": "libs/swiper.min",
        "index": "app/index"
    }
})
require(['index'])