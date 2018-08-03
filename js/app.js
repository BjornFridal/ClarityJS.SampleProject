
// ==================================================
//    Viden om Laesning scripts
// ==================================================


(function($) {

  $window = $(window);

  function fixedNav(){
  	if(Foundation.utils.is_small_only()){
  		var criticalPoint = $(".js-nav-section").offset().top;

  		$window.on("scroll", function(){
  			var timeout = setTimeout(function(){
  				if($window.scrollTop() >= criticalPoint) {
  					if(!$(".js-nav-section").hasClass("fixed")){
  						$(".js-nav-section").addClass("fixed");
  					}
  				} else {
  					$(".js-nav-section").removeClass("fixed");
  				}
  			}, 100);
  			// if(timeout){
  			// 	clearTimeout(timeout);
  			// }
  		})
  	}
  }

  function initIntroSliderHome() {
    if(Foundation.utils.is_medium_up()){
	    var introslider = $(".js-intro-home").bxSlider({
		  video: true,
		  useCSS: false,
		  auto: true,
		  pager: false,
		  autoHover: true,
		  controls: false,
		  pause: 10000,
		  onSliderLoad: function(){
		  	if(Foundation.utils.is_large_up()){
			  	var active = $(".js-intro-home").find("li[aria-hidden='false']").addClass("active");
			  	var movie = active.find("video");
			  	if(movie.length) {
			  		movie.trigger('play');
			  	}
			}	  		
		  },

		  onSlideNext: function(){
		  	if(Foundation.utils.is_large_up() && introslider ){
			  	introslider.find("li").removeClass("active");
			  	$('video').trigger('pause');
			}
		  },
		 
		  onSlideAfter: function(){
		  	if(Foundation.utils.is_large_up() && introslider ){
			  	var active = introslider.find("li[aria-hidden='false']").addClass("active");
			  	var movie = active.find("video");
			  	if(movie.length) {
			  		movie.trigger('play');
			  	}
		  	}  	
		  }
		});
	}
  }

  function initIntroSlider() {
    if(Foundation.utils.is_medium_up()){
      var introslider = $(".js-intro").bxSlider({
        video: true,
        useCSS: false,
        auto: true,
        pager: false,
        autoHover: true,
        controls: false,
        pause: 3000,
      });
    }
  }

  function animateAccordion() {
    $(".accordion li").on("click", "a:eq(0)", function (event) {
      var li_parent = $(this).parent();

      if(li_parent.hasClass('active'))
        $(".accordion li div.content:visible").slideToggle("normal");
      else {
        $(".accordion li div.content:visible").slideToggle("normal");
        $(this).parent().find(".content").slideToggle("normal");
      }
    });
  }

  function removeMobileNav(){
    var closeIcon = $('.js-icon-close');
    var topBar = $('.top-header');
    var sideNav = $('.side-navigation');
    var contentWrapper =$('.content-wrapper').first();

    $("body").removeClass('overflow-hidden');

    sideNav.addClass("overflow-hidden");
    contentWrapper.removeClass("is-pushed-left");
    topBar.removeClass("is-pushed-left");
    // sideNavigation.removeClass("visible");
    $(".js-menu-trigger").removeClass("active");
    closeIcon.removeClass("visible");

    //Falback for old IE
    if($("html").hasClass("no-csstransitions")) {
      contentWrapper.animate({left: "0"});
      topBar.animate({left: "0"});
    }
  }

  //Accordion functionality in side-navigation
  function mobileAccordion(){
    var sideNav = $('.side-navigation').find(".side-navigation--primary");
    clickableItems = sideNav.find(" > li.menu-item-has-children > a");


    // Open first block
    sideNav.find("li.menu-item-has-children > .sub-menu").slideUp();
    // sideNav.find("li.menu-item-has-children:first").find(".sub-menu").slideDown();

    clickableItems.each(function(){
      var self = $(this);
      self.on("click", function(e){
        e.preventDefault();
        var allPanels = sideNav.find('li.menu-item-has-children > .sub-menu').slideUp();
        clickableItems.parent("li").removeClass("open");
        self.parent("li.menu-item-has-children").addClass("open").children(".sub-menu").stop().slideDown();
      })
    })
  }

  // Adding navigation for mobile
  function addSideNav() {
    var menuTrigger = $('.js-menu-trigger');
    var closeIcon = $(".js-icon-close");
    var topHeader = $('.top-header');
    var sideNav = $('.side-navigation');
    var contentWrapper =$('.content-wrapper').first();
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var body = $('body');

    $(".side-navigation--primary").find("li").first().addClass("open");

    menuTrigger.on('click', function(e) {

      e.preventDefault();

      $(this).toggleClass('active');
      topHeader.toggleClass('is-pushed-left');

      sideNav.hasClass('overflow-hidden') ? sideNav.removeClass('overflow-hidden') : sideNav.addClass('overflow-hidden');

      closeIcon.hasClass('visible') ? closeIcon.removeClass('visible') : closeIcon.addClass('visible');

      if( is_firefox ) {
        contentWrapper.toggleClass('is-pushed-left').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          body.toggleClass('overflow-hidden');
        });
      } else {
        contentWrapper.toggleClass('is-pushed-left');
        body.toggleClass('overflow-hidden');
        $(window).trigger("resize");
      }
    });

    // Closing side navigation on ESC click
    $(document).keyup(function(e) {
      var body = $('body');

      if (contentWrapper.hasClass('is-pushed-left')) {
        if (e.keyCode == 27) { // esc keycode
          menuTrigger.removeClass('active');
          sideNav.hasClass('overflow-hidden') ? sideNav.removeClass('overflow-hidden') : sideNav.addClass('overflow-hidden');

          if( is_firefox ) {
            contentWrapper.removeClass('is-pushed-left').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              body.removeClass('overflow-hidden');
            });
          } else {
            contentWrapper.removeClass('is-pushed-left');
            body.removeClass('overflow-hidden');
          }

          e.preventDefault();
        }
      }
    });
  }

  // Copy next element when clicking a link
  function copyText() {
    if($(".js-copy").length){
      $(".js-copy").find("a").on("click", function(e){
        e.preventDefault();
        var copiedText = $(this).next().text();

        // Create a "hidden" input
        var aux = document.createElement("input");

        // Assign it the value of the specified element
        $(aux).val("" + copiedText + "");

        // Append it to the body
        document.body.appendChild(aux);

        // Highlight its content
        aux.select();

        // Copy the highlighted text
        document.execCommand("copy");

        // Remove it from the body
        document.body.removeChild(aux);
      })
    }
  }

  function toggleDetails() {
    $(".js-details-toggle").on("click", function(e){
      e.preventDefault();
      var self = $(this); 
      if(!self.closest(".article").hasClass("shown")){
        self.addClass("shown");
        self.closest(".article").addClass("shown");
      } else {
        self.removeClass("shown");
        self.closest(".article").removeClass("shown");
      }
    })
  }


  //DOCUMENT READY
  $(document).ready(function(){


    $(document).foundation();

    $(document).foundation('equalizer', 'reflow');

    $(document).foundation('accordion', 'reflow');

    // $(document).foundation('reveal', 'reflow');

    addSideNav();

    mobileAccordion();

    fixedNav();

    initIntroSliderHome();

    initIntroSlider();

    copyText();

    toggleDetails();

    animateAccordion();


 
  });
  


})(jQuery);



