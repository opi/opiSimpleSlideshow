/**
 *  opiSimpleSlideshow for jQuery ( http://opisimpleslideshow.532px.com )
 *  by: opi ( http://www.532pixel.com )
 *
 *  Licence : APACHE 2.0 ( http://www.apache.org/licenses/LICENSE-2.0 )
 *
 *  Usage (default values):
 *  $('div#slider').opiSimpleSlideshow({
 *      auto: true,                     // start slider at init (useless now because no move public method exists!)
 *      setPosition: true,              // set container & slides css position (slider:relative, slides:absolute)
 *      speed: 1000,                    // transition speed
 *      interval: 3000,                 // delay between 2 slides
 *      zIndex: 10                      // base z-index (all slides: zIndex, current slide: zIndex+2, last current slide zIndex+1)
 *      pauseOnHover: false             // pause the slide show when mouse is hover
 *  })
 *
 *  Credits : the animation part was inspired from Jon Raasch (http://jonraasch.com/blog/a-simple-jquery-slideshow)
 *
 */
(function($) {

    $.opiSimpleSlideshow = function(el, settings) {

        var slider = this;

        slider.defaults = {
            auto: true,
            setPosition: true,
            speed: 100,
            interval: 5000,
            zIndex: 10,
            pauseOnHover: false
        }; // defaults

        slider.init = function() {

            // get defaults settings
            slider.options = $.extend({}, slider.defaults, settings);

            // access jQuery version of element
            slider.$el = $(el);

            // init all slides zIndex
            slider.$el.children().css('zIndex', slider.options.zIndex);

            // set slider css position
            if (slider.options.setPosition)
                slider.$el.css('position', 'relative').children().css('position', 'absolute');

            // init current slide
            if (!$('.current', slider.$el).length) $(':first', slider.$el).addClass('current').css('zIndex', slider.options.zIndex+2);

            // pause slideshow when mouse is over
            if (slider.options.pauseOnHover) {
                slider.$el.hover(function() {
                    slider.pause();
                }, function() {
                    slider.play();
                });
            }

            // loop !
            if (slider.options.auto) slider.play();

        }; // slider.init

        slider.move = function() {

            // get current and next slide
            slider.current = $('.current', slider.$el).addClass('last-current').css('zIndex', slider.options.zIndex+1);
            slider.next =  slider.current.next().length ? slider.current.next() : $(':first', slider.$el);

            // switch to next slide
            slider.next.css({opacity: 0.0})
                .addClass('current')
                .css('zIndex', slider.options.zIndex+2)
                .animate({opacity: 1.0}, slider.options.speed, function() {
                    slider.current.removeClass('current last-current')
                        .css('zIndex', slider.options.zIndex);
                });
        }; // slider.move

        slider.pause = function() {
            if(slider.interval) window.clearInterval(slider.interval);
        }

        slider.play = function() {
            slider.pause(); // do not trigger it twice
            slider.interval = window.setInterval(function() {
                slider.move();
            }, slider.options.interval);
        }; // slider.play


        // Trigger the initialization
        slider.init();

    }; // $.opiSimpleSlideshow


    $.fn.opiSimpleSlideshow = function(settings) {
        // 'return' allow chaining awesomeness
        return this.each(function(i){
            (new $.opiSimpleSlideshow(this, settings));
        });
    };


})(jQuery);
