/**
 *  opiSimpleSlideshow for jQuery
 *  by: opi (http://www.532pixel.com)
 *
 *  Licence : Free
 *
 *  Usage (default values):
 *  $('div#slider').opiSimpleSlideshow({
 *      auto: true,                     // start slider at init (useless now because no move public method exists!)
 *      setPosition: true,              // set container & slides css position (slider:relative, slides:absolute)
 *      speed: 1000,                    // transition speed
 *      interval: 3000,                    // delay between 2 slides
 *      zIndex: 10                      // base z-index (all slides: zIndex, current slide: zIndex+2, last current slide zIndex+1)
 *  })
 *
 *
 *  Credits : the animation part was inspired from Jon Raasch (http://jonraasch.com/blog/a-simple-jquery-slideshow)
 *
 */

(function($) {

    $.opiSimpleSlideshow = function(el, settings) {

        var slider = this;

        slider.init = function() {

            // get defaults settings
            slider.options = $.extend({}, $.opiSimpleSlideshow.defaults, settings);

            slider.el = $(el);

            // init all slides zIndex
            slider.el.children().css({
                'zIndex': slider.options.zIndex
            });

            // set slider css position
            if (slider.options.setPosition) slider.setPosition();

            // init current slide
            if (!$('.current', slider.el).length) $(':first', slider.el).addClass('current').css('zIndex', slider.options.zIndex+2);

            // loop !
            if (slider.options.auto) {
                slider.interval = window.setInterval(function() {
                    slider.move();
                }, slider.options.interval);
            }

        } // slider.init

        slider.move = function() {

            // get current and next slide
            slider.current = $('.current', slider.el).css('zIndex', slider.options.zIndex+2);
            slider.next =  slider.current.next().length ? slider.current.next() : $(':first', slider.el);

            // switch to next slide
            slider.current.addClass('last-current').css('zIndex', slider.options.zIndex+1);
            slider.next.css({opacity: 0.0})
                .addClass('current')
                .css('zIndex', slider.options.zIndex+2)
                .animate({opacity: 1.0}, slider.options.speed, function() {
                    slider.current.removeClass('current last-current')
                        .css('zIndex', slider.options.zIndex);
                });


        } // slider.move


        slider.setPosition = function() {

            // init slides container position
            slider.el.css('position', 'relative');

            // init all slides positions
            slider.el.children().css({
                'position': 'absolute'
            });
        }


        // Trigger the initialization
        slider.init();

    };

    $.opiSimpleSlideshow.defaults = {
        auto: true,
        setPosition: true,
        speed: 1000,
        interval: 3000,
        zIndex: 10
    };


    $.fn.opiSimpleSlideshow = function(settings) {
        return this.each(function(i){
            (new $.opiSimpleSlideshow(this, settings));
        });
    };


})(jQuery);
