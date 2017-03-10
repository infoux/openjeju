$(document).ready(function () {
    var mainFood = null;
    var mainFood_config = {
        auto: true,
        moveSlides: 1,
        infiniteLoop: true
    };


    function viewMode() {
        var windowWidth = $(window).width();

        if (windowWidth < 1199) {
            $("body").removeClass("pc");
            $("body").addClass("mobile");
            if (mainFood == null) {
                mainFood = $('.main-food ul').bxSlider(mainFood_config);
            }
        } else {

            $("body").addClass("pc");
            $("body").removeClass("mobile");
            if (mainFood != null) {
                mainFood.destroySlider();
                mainFood = null;

                $('.main-food ul').attr("style") = "";
                $('.main-food li').attr("style") = "";
            }

        }

        $(".main-issue").css("background", "url(" + $(".main-issue .issue-bg").attr("src") + ") no-repeat center / cover");
        $(".main-food li").each(function () {
            $(this).css("background", "url(" + $(this).find("img").attr("src") + ") no-repeat center / cover");
        });


        var mag = ($(window).width() - 330) / 2;
        $('.mobile .main-food ul').css('margin-left', mag).css('margin-right', mag);

    }

    function mainHeight() {
        $(".pc .main-issue").css("height", $(window).height() - 70);
        $(".mobile .main-issue").css("height", "");
    }




    viewMode();
    mainHeight();

    $(".menuToggle").click(function () {
        $("#header nav").addClass("open");
    });
    $("#header nav .close").click(function () {
        $("#header nav").removeClass("open");
    });





    $(window).resize(function () {
        viewMode();
        mainHeight();

    });

    $(window).load(function () {

        var snsGird = new Masonry('.main-sns .grid', {
            // options
            itemSelector: '.grid-item',
            gutter: 10
        });
    })


});