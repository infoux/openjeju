$(document).ready(function() {



  var carouselWidth = 1199;
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

    $('.main-food .bx-viewport').css("height", "auto");
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

  $(".top_banner").css("background-color", $(this).find("img").attr("data"));
  $(".top_banner button").click(function() {
    $(".top_banner").css("display", "none");
  });

  $(".board-gallery .image").each(function() {

    $(this).css("background", "url(" + $(this).find("img").attr("src") + ") no-repeat center / cover");



  });




  function viewMode() {
    var windowWidth = $(window).width();
    if (windowWidth < 1199) {
      $("body").removeClass("pc");
      $("body").addClass("mobile");


      $('body #main_menu .menu>li').has('ul').find("h2 a").removeAttr("href");


      $('body #main_menu h2 a').on('click', function() {
        $("body #main_menu ul ul").removeAttr("style");
        $(this).parent().parent().find("ul").css("height", "auto");

      });


    } else {
      $("body").addClass("pc");
      $("body").removeClass("mobile");


      $('body #main_menu h2 a').mouseenter(function() {
        $('body #main_menu').addClass("active");

      });


      $('body #main_menu').mouseleave(function() {
        $('body #main_menu').removeClass("active");

      });


    }









    $(".main-issue").css("background", "url(" + $(".main-issue .issue-bg").attr("src") + ") no-repeat center / cover");
    $(".sub-head").css("background", "url(" + $(".sub-head>img").attr("src") + ") no-repeat center / cover");
    $(".visual-area").css("background", "url(" + $(".visual-area img").attr("src") + ") no-repeat center / cover");
    $(".pc .view-head").css("background", "url(" + $(".view-head img").attr("src") + ") no-repeat center / cover");
    $(".mobile .view-head").css("background", "");
    $(".mobile .view-head .image").css("background", "url(" + $(".view-head img").attr("src") + ") no-repeat center / cover");
    $(".main-food li").each(function() {
      $(this).css("background", "url(" + $(this).find("img").attr("src") + ") no-repeat center / cover");
    });

    $(".main-trip li").each(function() {
      $(this).css("background", "url(" + $(this).find("img").attr("src") + ") no-repeat center / cover");
    });



    var mag = ($(window).width() - $('.mobile .main-food li').width() - 20) / 2;

    $('.mobile .main-food ul').css('margin-left', mag).css('margin-right', mag);

  }

  /*
      function mainHeight() {
          $(".pc .main-issue").css("height", $(window).height() - 70);
          $(".pc .visual-area").css("height", $(window).height());
          $(".mobile .main-issue").css("height", "");
          $(".mobile .visual-area").css("height", "");
      }
  */



  viewMode();
  //    mainHeight();
  popword();
  matSlider();
  weatherSlider();
  popWordSlider()

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

  $("body.mobile section.mat #category li.active").click(function() {
    $(this).parent().find('li').show();
  });

  $('body.mobile section.mat #category li .option').click(function(e) {
    $('body.mobile section.mat #category li').hide();
    $("body.mobile section.mat #category li.active a").text($(e.target).text());
  });
  $("body.mobile section.search-result button.mobile-category").click(function() {
    $(this).parent().find('ul').css("display", "inline-block");
    $("body.mobile section.search-result button.mobile-close").css("display", "inline-block");
  });
  $('body.mobile section.search-result .search-category li .option').click(function(e) {
    $('body.mobile section.search-result .search-category').css("display", "");
    $("body.mobile section.search-result button.mobile-close").css("display", "");
    $("body.mobile section.search-result button.mobile-category").text($(e.target).text());
  });
  $("body.mobile section.search-result button.mobile-close").click(function(e) {
    $('body.mobile section.search-result .search-category').css("display", "");
    $("body.mobile section.search-result button.mobile-close").css("display", "");
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

  $('#header .gnb .lang').click(function() {
    $('#header .gnb .lang-list').toggle();
  });



  $(".map-pop p").perfectScrollbar();
  $(".sub-head nav ul").perfectScrollbar();




  $(window).resize(function() {
    viewMode();
    weatherSlider();
    popword();
    popWordSlider();
    matSlider();
  });
  /*
      $(window).load(function() {
          if ($("#content").hasClass("main")) {
              var snsGird = new Masonry('.main-sns .grid', {
                  // options
                  itemSelector: '.grid-item',
                  gutter: 10
              });
          }
      });
  */

  $('body.mobile .plan-pop .close').click(function() {
    $('body.mobile .plan-pop').hide();
  });
  $('body.mobile p.mobile-mapView a').click(function() {
    $('body.mobile .sub .plan-view .list').hide();
    $('body.mobile .sub .plan-view .mapView').show();
  });






  $('body.pc .sub .list-type01 .container ul li a.detail').click(function() {
    if ($(this).find('i').hasClass('fa-angle-down')) {
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    } else {
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');
    }
    $(this).parent().parent().next().toggle();
    $('body.pc .sub .list-type01.gallery .container ul li.vr').hide();
    $('body.pc .sub .list-type01.gallery .container ul li.filght').hide();
  });
  $('body.pc .sub .list-type01.gallery .container ul li a.vr').click(function() {
    $(this).parent().parent().next().next().toggle();
    $('body.pc .sub .list-type01.gallery .container ul li.detail').hide();
    $('body.pc .sub .list-type01.gallery .container ul li.filght').hide();
  });
  $('body.pc .sub .list-type01.gallery .container ul li a.filght').click(function() {
    $(this).parent().parent().next().next().next().toggle();
    $('body.pc .sub .list-type01.gallery .container ul li.detail').hide();
    $('body.pc .sub .list-type01.gallery .container ul li.vr').hide();
  });

  $('body.mobile .sub .list-type01.gallery .container ul li .img .btn-area a.vr').click(function() {
    $(this).parent().parent().parent().next().next().toggle();
    $('body.mobile .sub .list-type01.gallery .container ul li.detail').hide();
    $('body.mobile .sub .list-type01.gallery .container ul li.filght').hide();
  });
  $('body.mobile .sub .list-type01.gallery .container ul li .img .btn-area a.detail').click(function() {
    $(this).parent().parent().parent().next().toggle();
    $('body.mobile .sub .list-type01.gallery .container ul li .text').toggle();
    $('body.mobile .sub .list-type01.gallery .container ul li.vr').hide();
    $('body.mobile .sub .list-type01.gallery .container ul li.filght').hide();
  });
  $('body.mobile .sub .list-type01.gallery .container ul li .img .btn-area a.filght').click(function() {
    $(this).parent().parent().parent().next().next().next().toggle();
    $('body.mobile .sub .list-type01.gallery .container ul li.vr').hide();
    $('body.mobile .sub .list-type01.gallery .container ul li.detail').hide();
  });

  $('body .sub .sub-info .container .tabs a').on('click', function() {
    var tab = $(this).attr("data");
    $('body .sub .sub-info .container .tabs a').removeClass('active');
    $(this).addClass('active');
    $('body .sub .sub-info .container .tab').removeClass('active');
    $('body .sub .sub-info .container .tab.' + tab).addClass('active');
  });



  $('#imgList').bxSlider({
    auto: true,
    infiniteLoop: true,
    controls: false
  });

  /* STAR_RATE*/
  var $starRate = $('.star-rate');
  if ($starRate.length > 0) $starRate.on('click', 'a', function() {
    var starValue = $(this).attr("data");
    $starRate.find('a').each(function() {
      $(this).find("i").removeClass("fa-star");
      $(this).find("i").addClass("fa-star-o");
      if ($(this).attr("data") <= starValue) {
        $(this).addClass("on");
        $(this).find("i").removeClass("fa-star-o");
        $(this).find("i").addClass("fa-star");
      }
    });
  });

});

/* global*/


var $matSlider = {
  state: 'destroy',
  slider: undefined
};
/* memory leak 방지*/
function matSlider() {

  var $el = $(".mat-list .slider");
  try {
    $matSlider.slider.destroySlider();
    $matSlider.state = 'destroy';
    $el.removeAttr('style');
    $.each($el.find('li'), function(e1, e2) {
      $(e2).removeAttr('style')
    });
  } catch (e1) {

  }

  if ($matSlider.state === 'destroy') {
    $matSlider.state = 'build';
    $matSlider.slider = $el.bxSlider({
      auto: true,
      speed: 1000,
      pager: false,
      controls: false,
      slideMargin: 10,
      infiniteLoop: true,
      minSlides: 20,
      maxSlides: 30

    });
  }

}

var $weatherSlider = {
  state: 'destroy',
  slider: undefined
};
/* memory leak 방지*/
function weatherSlider() {
  var $el = $(".main-issue .weather ul");
  try {
    $weatherSlider.slider.destroySlider();
    $weatherSlider.state = 'destroy';

  } catch (e1) {

  }

  if ($weatherSlider.state === "destroy") {
    $weatherSlider.state = 'build';
    $weatherSlider.slider = $el.bxSlider({
      mode: 'fade',
      speed: 1000,
      pager: false,
      controls: false,
      auto: true,
      infiniteLoop: true,
      slideMargin: 15
    });
  }
}

var $popWordSlider = {
  state: 'destroy',
  slider: undefined
};
/* memory leak 방지*/
function popWordSlider() {
  var $el = $(".main-issue .search .text ul");
  try {
    $popWordSlider.slider.destroySlider();
    $popWordSlider.state = 'destroy';
    $el.removeAttr('style');
    $.each($el.find('li'), function(e1, e2) {
      $(e2).removeAttr('style')
    });
  } catch (e1) {

  }

  if ($popWordSlider.state === 'destroy') {
    $popWordSlider.state = 'build';
    $popWordSlider.slider = $el.bxSlider({
      mode: 'vertical',
      speed: 1000,
      pager: false,
      controls: false,
      auto: true,
      infiniteLoop: true,
      maxSlides: 1,


    });
    $('.main-issue .text .prevSlider').click(function() {
      $popWordSlider.slider.goToPrevSlide();
      $popWordSlider.slider.stopAuto();
      return false;
    });
    $('.main-issue .text .nextSlider').click(function() {
      $popWordSlider.slider.goToNextSlide();
      $popWordSlider.slider.stopAuto();
      return false;
    });
  }
}


var $searchPopword = {
  state: 'destroy',
  slider: undefined
};




function popword() {
  var $el = $('.sidebar .popword ul');
  try {
    $searchPopword.slider.destroySlider();
    $el.removeAttr('style');
    $.each($el.find('li'), function(e1, e2) {
      $(e2).removeAttr('style')
    });
    $searchPopword.state = 'destroy';
  } catch (e1) {}
  if ($("body").hasClass("mobile") && $searchPopword.state === 'destroy') {
    $searchPopword.state = 'build';
    $searchPopword.slider = $('.sidebar .popword ul').bxSlider({
      mode: "vertical",
      pager: false,
      controls: false,
      auto: true,
      infiniteLoop: true
    });
  }
}
