/* ----- Custom Scripts for Destiny template ----- */

jQuery(function($) {
    "use strict";

    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#root').offset().top;

    // on scroll,
    $(window).on('scroll',function(){

    // we round here to reduce a little workload
    stop = Math.round($(window).scrollTop());
    if (stop > mainbottom) {
        $('.navbar').addClass('past-main');
        $('.navbar').addClass('effect-main')
    } else {
        $('.navbar').removeClass('past-main');
   }

  });


  // Collapse navbar on click

   $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
   }
  });

/* ------ jQuery for Easing min -- */

  $(function() {
  $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });
});


 /*-----------------------------------
 ----------- Scroll To Top -----------
 ------------------------------------*/

 $(window).scroll(function () {
   if ($(this).scrollTop() > 1000) {
       $('#back-top').fadeIn();
   } else {
       $('#back-top').fadeOut();
   }
 });
 // scroll body to 0px on click
 $('#back-top').on('click', function () {
   $('#back-top').tooltip('hide');
   $('body,html').animate({
       scrollTop: 0
   }, 1500);
   return false;
 });

});
