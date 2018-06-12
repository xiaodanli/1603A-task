require.config({
    baseUrl: '/js/',
    paths: {
        //库
        'jquery': 'libs/jquery-2.1.1.min',
        'swiper': 'libs/swiper.min',

        //自己使用
        'index': 'page/index'

    }
})

require(['index'])