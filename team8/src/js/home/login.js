define(["jquery"], function($) {
    $(".btn").on("click", function() {
        $.ajax({
            url: "/login",
            type: "post",
            data: {
                user: $(".user").val(),
                pwd: $("pwd").val()
            },
            dataType: "json",
            success: function(str) {
                console.log(str);
                if (str.code == 1) {
                    location.href = "http://localhost:8089";
                    var storage = window.localStorage;
                    storage.setItem("uid", 1);
                } else {
                    $(".mask").css("display", "block");
                }
            }
        });
    });
    // $("#success").on("click", function() {
    //     $(".mask").css("display", "none");
    // });
    $('body').dailog({
        title: "登录失败"
    });

});