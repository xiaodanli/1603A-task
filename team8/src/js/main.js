require.config({
    baseUrl: "../js/",
    paths: {
        "jquery": "lib/jquery",
        "swiper": "lib/swiper.min",
        "index": "home/index",
        "login": "home/login",
        "dailog": "home/jquery.dailog"
    },
    shim: {
        dailog: {
            exports: "dailog",
            deps: ["jquery"]
        }
    }
});