define(["jquery", "swiper"], function($, swiper) {
    //实例化swiper
    var swi = new swiper(".nav", {
        autoplay: true
    });

    //本地存储取数据
    var storage = window.localStorage;
    var n = storage.getItem("uid") || 0;
    if (n) {
        $(".nav").css("visibility", "visible");
        $(".nav").css("height", "auto");
    };
});