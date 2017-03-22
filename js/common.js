$(document).ready(function() {



    var carouselWidth = 1190;
    var ttCarousel;
    var ttCarousel_Config = {
        auto: true,
        moveSlides: 1,
        infiniteLoop: true,
        preventDefaultSwipeY: false
    }

    if ($(window).width() < carouselWidth) {
        if (ttCarousel == null)
            ttCarousel = $('.main-food .slider').bxSlider(ttCarousel_Config);
    };

    $(window).resize(function() {
        try {
            if ($(window).width() < carouselWidth) {
                if (ttCarousel) {
                    ttCarousel.reloadSlider();
                } else {
                    ttCarousel = $('.main-food .slider').bxSlider(ttCarousel_Config);
                }
            } else {
                if (ttCarousel) {
                    ttCarousel.destroySlider();
                    $('.main-food .slider').each(function() {
                        $(this).find("li").css("width", "");
                        $(this).attr("style", "");
                    });
                }
            }
        } catch (e) {

        }
    });



    function viewMode() {
        var windowWidth = $(window).width();
        if (windowWidth < 1199) {
            $("body").removeClass("pc");
            $("body").addClass("mobile");
        } else {
            $("body").addClass("pc");
            $("body").removeClass("mobile");
        }

        $(".main-issue").css("background", "url(" + $(".main-issue .issue-bg").attr("src") + ") no-repeat center / cover");
        $(".sub-head").css("background", "url(" + $(".sub-head>img").attr("src") + ") no-repeat center / cover");
        $(".pc .view-head").css("background", "url(" + $(".view-head img").attr("src") + ") no-repeat center / cover");
        $(".mobile .view-head").css("background", "");
        $(".mobile .view-head .image").css("background", "url(" + $(".view-head img").attr("src") + ") no-repeat center / cover");
        $(".main-food li").each(function() {
            $(this).css("background", "url(" + $(this).find("img").attr("src") + ") no-repeat center / cover");
        });


        var mag = ($(window).width() - $('.mobile .main-food li').width() - 20) / 2;

        $('.mobile .main-food ul').css('margin-left', mag).css('margin-right', mag);

    }

    function mainHeight() {
        $(".pc .main-issue").css("height", $(window).height() - 70);
        $(".mobile .main-issue").css("height", "");
    }




    viewMode();
    mainHeight();

    $(".menuToggle").click(function() {
        $("#header nav").addClass("open");
    });
    $("#header nav .close").click(function() {
        $("#header nav").removeClass("open");
    });

    $(".indicator li a").click(function() {
        $(".indicator li .sub-menu").css("display", "none");
        $(this).parent().find(".sub-menu").toggle();
    });


    $('#map-area li a').on('click', function() {
        var activeTab = $(this).parent().attr('id');
        $('#map-area li').removeClass('active');
        $(this).parent().addClass('active');

        $('#map-area').addClass(activeTab);
        $('#map-area .map-pop').css('display', 'none');
        $('#map-area .map-pop.' + activeTab).css('display', 'block');
        console.log(activeTab);
    });


    $(window).resize(function() {
        viewMode();
        mainHeight();


    });

    $(window).load(function() {
        if ($("#content").hasClass("main")) {
            var snsGird = new Masonry('.main-sns .grid', {
                // options
                itemSelector: '.grid-item',
                gutter: 10
            });
        }
    });


});
