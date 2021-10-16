//GLOBAL
var homePageHash = 'page_home';
var curr_li;
var prev_li;

var rpm = {
  init: function() {
    rpm.initBGSlideShow();
    rpm.initEvents();
    rpm.listen('load', window, rpm.WIN_LOAD);
  },

  initBGSlideShow: function() {
    $(function($) {
      $.supersized({
        // Functionality
        slideshow: 1, // Slideshow on/off
        autoplay: 1, // Slideshow starts playing automatically
        start_slide: 1, // Start slide (0 is random)
        stop_loop: 0, // Pauses slideshow on last slide
        random: 0, // Randomize slide order (Ignores start slide)
        slide_interval: 4000, // Length between transitions
        transition: 1, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed: 1000, // Speed of transition
        new_window: 1, // Image links open in new window/tab
        pause_hover: 0, // Pause slideshow on hover
        keyboard_nav: 1, // Keyboard navigation on/off
        performance: 1, // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
        image_protect: 1, // Disables image dragging and right click with Javascript

        // Size & Position
        min_width: 0, // Min width allowed (in pixels)
        min_height: 0, // Min height allowed (in pixels)
        vertical_center: 1, // Vertically center background
        horizontal_center: 1, // Horizontally center background
        fit_always: 0, // Image will never exceed browser width or height (Ignores min. dimensions)
        fit_portrait: 1, // Portrait images will not exceed browser height
        fit_landscape: 0, // Landscape images will not exceed browser width

        // Components
        slide_links: 'blank', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
        thumb_links: 1, // Individual thumb links for each slide
        thumbnail_navigation: 0, // Thumbnail navigation
        slides: [
          // Slideshow Images
          {
            image: 'images/slider_img_1.jpg',
            title: '<h1>welcome</h1> <h2>to rva pug meetup</h2>'
          },
          {
            image: 'images/slider_img_4.jpg',
            title:
              '<br><br><br><br><br><br><br><br><br><h1>17 years</h1> <h2>cheers to us!</h2>'
          },

          {
            image: 'images/slider_img_2.jpg',
            title:
              "<h1>get your <br>pug-o-ween on!</h1> <h2>what's better than pugs in costumes?</h2><p>Mark your calendars for our 11th Annual event on 10/24/2021!</p>"
          },
          {
            image: 'images/slider_img_3.jpg',
            title: '<h1>pug breath</h1> <h2>what yah gonna do about it?</h2>'
          }
        ],

        // Theme Options
        progress_bar: 1, // Timer for each slide
        mouse_scrub: 0
      });
    });
  },

  initEvents: function() {
    //LOGO CLICK EVENT

    $('#logo').live('click', function(e) {
      e.preventDefault();
      var logo = $('#logo');
      var menu = $('#sidebarmenu');
      var content = $('#content');

      if ($(this).hasClass('logo_active')) {
        $(this).removeClass('logo_active');
        $('#sidebarmenu li a').removeClass('active');
        var logo = $('#logo');
        logo.stop().animate({ top: '290px' }, 600, 'easeOutCubic');
        var menu = $('#sidebarmenu');
        menu.css({ left: '-300px' });

        var content = $('#content');
        content.css({ left: '-750px', display: 'none' });

        $('li#' + location.hash)
          .stop()
          .animate({ left: '-750px' }, 400, 'easeInSine', function() {
            $(this).css({ display: 'none' });
          });
        $('#slidecaption').css('display', 'block');
        location.hash = '';
      } else {
        $('#slidecaption').css('display', 'none');
        $(this).addClass('logo_active');
        logo.stop().animate({ top: '0px' }, 600, 'easeOutCubic');
        menu.stop().animate({ left: '0px' }, 600, 'easeOutCubic');
        content
          .stop()
          .css({ display: 'block' })
          .animate({ left: '0px' }, 600, 'easeOutCubic');
        $('li#' + homePageHash)
          .css({ display: 'block' })
          .stop()
          .delay(450)
          .animate({ left: '0px' }, 750, 'easeOutCubic', function() {
            location.hash = '#' + homePageHash;
            $('#sidebarmenu li a').removeClass('active');
            $('#sidebarmenu li')
              .find('a[href="#' + homePageHash + '"]')
              .addClass('active');
          });
      }
    });

    //MENU CLICK EVENT
    $('#sidebarmenu li a').live('click', function(e) {
      e.preventDefault();

      $('#sidebarmenu li a').removeClass('active');
      $(this).addClass('active');

      var href = $(this).attr('href');

      if (href == location.hash) {
        return;
      } else {
        if (location.hash == '#' || location.hash.length == 0) {
          prev_li = $('li#' + homePageHash);
        } else {
          prev_li = $('li#' + location.hash);
        }

        curr_li = $('li#' + href);

        location.hash = href;

        rpm.animatePage();
      }
    });

    $('a.button').live('click', function(e) {
      e.preventDefault();
      return;
    });

    //window resize event
    $(window).resize(function() {
      rpm.initSlideShows();

      var ww = $(window).width();

      if (ww > 750) {
        var logo = $('#logo');
        var menu = $('#sidebarmenu');
        var content = $('#content');

        $('#sidebarmenu li a').removeClass('active');
        var logo = $('#logo');
        logo.stop().animate({ top: '290px' }, 600, 'easeOutCubic');
        var menu = $('#sidebarmenu');
        menu.css({ left: '-300px' });

        var content = $('#content');
        content.css({ left: '-750px', display: 'none' });
        if (location.hash != '' && location.hash.length > 0) {
          $('li#' + location.hash)
            .stop()
            .animate({ left: '-750px' }, 400, 'easeInSine', function() {
              $(this).css({ display: 'none' });
            });
        }
        $('#slidecaption').css('display', 'block');
        location.hash = '';
      } else {
        $('#sidebarmenu select').val('');
      }
    });
  },

  listen: function(evnt, elem, func) {
    if (elem.addEventListener) elem.addEventListener(evnt, func, false);
    else if (elem.attachEvent) {
      var r = elem.attachEvent('on' + evnt, func);
      return r;
    }
  },

  //PAGE LOAD
  WIN_LOAD: function() {
    var all_li = $('#ulcontent li');
    all_li.css({ display: 'none', left: '-750px' });

    var logo = $('#logo');
    //logo.stop().animate({top:'290px'}, 600, 'easeOutCubic');

    var menu = $('#sidebarmenu');
    menu.css({ left: '-300px' });

    var content = $('#content');
    content.css({ left: '-750px', display: 'none' });

    if (location.hash == '' || location.hash.length == 0) {
    } else {
      logo.addClass('logo_active');
      logo.stop().animate({ top: '0px' }, 600, 'easeOutCubic');
      menu.stop().animate({ left: '0px' }, 600, 'easeOutCubic');
      content
        .stop()
        .css({ display: 'block' })
        .animate({ left: '0px' }, 600, 'easeOutCubic');
      $('li#' + location.hash)
        .css({ display: 'block' })
        .stop()
        .delay(450)
        .animate({ left: '0px' }, 750, 'easeOutCubic');
      $('#slidecaption').css('display', 'none');
    }
  },

  initSlideShowTemplate: function(id) {
    if (id == 'page_males') {
      if ($('#page_males').is(':empty')) {
        var gallery_data = { id: curr_li.attr('id') };
        var gallery = ich.page_males_template(gallery_data);
        $('#page_males').append(gallery);
      }
    } else if (id == 'page_females') {
      if ($('#page_females').is(':empty')) {
        var gallery_data = { id: curr_li.attr('id') };
        var gallery = ich.page_females_template(gallery_data);
        $('#page_females').append(gallery);
      }
    } else if (id == 'page_about') {
      if ($('#page_about').is(':empty')) {
        var gallery_data = { id: curr_li.attr('id') };
        var gallery = ich.page_about_template(gallery_data);
        $('#page_about').append(gallery);
      }
    }

    var timeout = setTimeout(function() {
      rpm.initSlideShow(id);
    }, 200);
  },

  initSlideShow: function(id) {
    if (id == 'page_males') {
      $('#carousel').carouFredSel({
        responsive: true,
        circular: false,
        auto: false,
        items: {
          visible: 1,
          width: 200,
          height: '56%'
        },
        scroll: {
          fx: 'directscroll'
        }
      });

      $('#thumbs').carouFredSel({
        responsive: true,
        auto: false,
        prev: '#prev',
        next: '#next',
        items: {
          visible: {
            min: 2,
            max: 5
          },
          width: 150,
          height: '66%'
        }
      });

      $('#thumbs a').click(function() {
        $('#carousel').trigger('slideTo', '#' + this.href.split('#').pop());
        $('#thumbs a').removeClass('selected');
        $(this).addClass('selected');
        return false;
      });
    } else if (id == 'page_females') {
      $('#carousel_2').carouFredSel({
        responsive: true,
        circular: false,
        auto: false,
        items: {
          visible: 1,
          width: 200,
          height: '56%'
        },
        scroll: {
          fx: 'directscroll'
        }
      });

      $('#thumbs_2').carouFredSel({
        responsive: true,
        auto: false,
        prev: '#prev_2',
        next: '#next_2',
        items: {
          visible: {
            min: 2,
            max: 5
          },
          width: 150,
          height: '66%'
        }
      });

      $('#thumbs_2 a').click(function() {
        $('#carousel_2').trigger('slideTo', '#' + this.href.split('#').pop());
        $('#thumbs_2 a').removeClass('selected');
        $(this).addClass('selected');
        return false;
      });
    } else if (id == 'page_about') {
      $('#carousel_3').carouFredSel({
        responsive: true,
        circular: false,
        auto: false,
        items: {
          visible: 1,
          width: 200,
          height: '56%'
        },
        scroll: {
          fx: 'directscroll'
        }
      });

      $('#thumbs_3').carouFredSel({
        responsive: true,
        auto: false,
        prev: '#prev_3',
        next: '#next_3',
        items: {
          visible: {
            min: 2,
            max: 5
          },
          width: 150,
          height: '66%'
        }
      });

      $('#thumbs_3 a').click(function() {
        $('#carousel_3').trigger('slideTo', '#' + this.href.split('#').pop());
        $('#thumbs_3 a').removeClass('selected');
        $(this).addClass('selected');
        return false;
      });
    }
  },

  //PAGE ANIMATE FN
  animatePage: function() {
    var slideShowID = curr_li.attr('id');

    console.log(slideShowID);

    if (curr_li) {
      if (
        slideShowID == 'page_males' ||
        slideShowID == 'page_females' ||
        slideShowID == 'page_about'
      ) {
        rpm.initSlideShowTemplate(slideShowID);
      }
      curr_li
        .css({ display: 'block' })
        .stop()
        .delay(450)
        .animate({ left: '0px' }, 750, 'easeOutCubic');
    }

    if (prev_li) {
      prev_li.stop().animate({ left: '-750px' }, 400, 'easeInSine', function() {
        $(this).css({ display: 'none' });
      });
    }
  }
};

$(document).ready(rpm.init);

// Responsive Menu
$(document).ready(function() {
  $('<select />').appendTo('#sidebarmenu');
  // Create default option "Go to..."
  $('<option />', {
    selected: 'selected',
    value: '',
    text: 'Go to...'
  }).appendTo('#sidebarmenu select');

  // Populate dropdowns with the first menu items
  $('#sidebarmenu ul#sidebarmenu1 li a').each(function() {
    var el = $(this);
    $('<option />', {
      value: el.attr('href'),
      text: el.text()
    }).appendTo('#sidebarmenu select');
  });

  //make responsive dropdown menu actually work
  $('#sidebarmenu select').change(function() {
    var href = $(this)
      .find('option:selected')
      .val();

    if (href == location.hash) {
      return;
    } else {
      $('#slidecaption').css('display', 'none');
      var content = $('#content');
      content
        .stop()
        .css({ display: 'block' })
        .animate({ left: '0px' }, 600, 'easeOutCubic');

      if (location.hash == '#' || location.hash.length == 0) {
        $('li' + href)
          .css({ display: 'block' })
          .stop()
          .delay(450)
          .animate({ left: '0px' }, 750, 'easeOutCubic', function() {
            location.hash = href;
            if (
              slideShowID == 'page_males' ||
              slideShowID == 'page_females' ||
              slideShowID == 'page_about'
            ) {
              rpm.initSlideShowTemplate(href);
            }
          });
      } else {
        prev_li = $('li#' + location.hash);
        curr_li = $('li' + href);
        location.hash = href;
        rpm.animatePage();
      }
    }
  });

  //Responsive Logo Click
  $('#logo_mobile').live('click', function(e) {
    e.preventDefault();
    var content = $('#content');
    content.css({ left: '-750px', display: 'none' });
    $('html,body').animate(
      { scrollTop: $('#logo_mobile').offset().top },
      'slow'
    );
    $('li#' + location.hash)
      .stop()
      .animate({ left: '-750px' }, 400, 'easeInSine', function() {
        $(this).css({ display: 'none' });
      });
    $('#slidecaption').css('display', 'block');
    location.hash = '';
  });
});
