require.config({
    baseUrl: "/js/",
    paths: {
        //库
        "jquery": "lib/jquery",
        "bscroll": "lib/bscroll.min",
        "swiper": "lib/swiper.min",
        //mysealf
        "index": "app/index"
    }
})
document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + "px";