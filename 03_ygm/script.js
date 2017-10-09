/*window.onload=function(){

};*/

$(function(){
    $(window).scroll(function () {
         // if($('body').width()<800)  return false;
        if ($(this).scrollTop() > 100) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#backtop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $(window).resize(function(){
        $(".header-top").css({
            width:window.screen.width
        });
    });
});
