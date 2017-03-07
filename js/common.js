$(document).ready(function () {

    $(".menuToggle").click(function () {
        $("#header nav").addClass("open");
    });

    $("#header nav .close").click(function () {
        $("#header nav").removeClass("open");
    });

});