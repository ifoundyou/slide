var PagesSlider = function(opts){
    var _this;
    var slideChanged = document.createEvent('Event');
    slideChanged.initEvent('slideChanged');
    var slideNext = document.createEvent('Event');
    slideNext.initEvent('slideNext');
    var slidePrev = document.createEvent('Event');
    slidePrev.initEvent('slidePrev');
    var currentSlideChanged = document.createEvent('Event');
    currentSlideChanged.initEvent('currentSlideChanged');

    var slideChangeStart = document.createEvent('Event');
    slideChangeStart.initEvent('slideChangeStart');

    return {
        mouse: {
            start : {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        },
        opts: {},
        wrapper: document.querySelector('body'),
        init: function (opts) {
            _this = this;
            this.opts = opts;
            this.wrapper = (opts.wrapper);

            var slides = this.wrapper.children;

            if ( this.wrapper.querySelector('.active') ) {
                this.wrapper.querySelector('.active').classList.add('slide-active-animation');
            } else {
                slides[0].classList.add('active');
                slides[0].classList.add('slide-active-animation');
            }
            if ( _this.wrapper.children.length > 1 ) {
                opts.container.addEventListener('touchstart', _this.setStartCords);
                opts.container.addEventListener('touchmove', _this.onMouseMove);
                opts.container.addEventListener('touchend', _this.swipeSlides);

            }
        },
        onMouseMove: function (e) {
            e.preventDefault();
            e.touches ||  e.originalEvent ? e = e.touches[0] : null;
            _this.mouse.end.x = e.pageX || e.clientX;
            _this.mouse.end.y = e.pageY || e.clientY;

            _this.mouse_move_parameter++;
            _this.progressCnahge();
        },
        mouse_move_parameter:0,
        clone: false,
        cloned_element: false,
        progressCnahge: function () {

            if ( !_this.mouse.start.y ) {
                _this.mouse.start.y = _this.mouse.end.y;
            }
            if ( !_this.mouse.start.x ) {
                _this.mouse.start.x = _this.mouse.end.x;
            }

            var elem = _this.wrapper.querySelector('.active'), nextSibling, prevSibling;
            document.dispatchEvent(slideChangeStart);

            if ( elem.nextElementSibling ) {
                nextSibling = elem.nextElementSibling
            } else {
                if ( this.wrapper.children )
                nextSibling = elem.parentNode.children[0];

            }

            if ( elem.previousElementSibling ) {
                prevSibling =  elem.previousElementSibling;
            } else {
                prevSibling =  elem.parentNode.children[elem.parentNode.children.length-1];

            }

            if ( window.orientation == 0 || window.orientation == 180 ) {
                if ( _this.opts.orientation == 'portrait' ) {

                    if (_this.mouse.start.y - _this.mouse.end.y > 0) {
                        elem.style.webkitTransformOrigin = '50% 0%';
                        elem.style.webkitTransform = ' scale(' + (Math.abs(1 - (window.innerHeight - nextSibling.getBoundingClientRect().top) / window.innerHeight)) + ')';

                    } else if ( _this.mouse.start.y - _this.mouse.end.y < 0 ) {
                        elem.style.webkitTransformOrigin = '50% 100%';
                        elem.style.webkitTransform = ' scale(' + (Math.abs(1 - (window.innerHeight - prevSibling.getBoundingClientRect().top) / window.innerHeight)) + ')';
                    }
                    nextSibling.style.webkitTransform  = 'translate3d(0,'+((window.innerHeight)+Math.round(_this.mouse.end.y - _this.mouse.start.y)) + 'px,0)';
                    prevSibling.style.webkitTransform  = 'translate3d(0,'+(-window.innerHeight+Math.round(_this.mouse.end.y - _this.mouse.start.y)) + 'px,0)';
                } else {
                    if (_this.mouse.start.y - _this.mouse.end.y > 0) {
                        elem.style.webkitTransformOrigin = '50% 0%';
                        elem.style.webkitTransform = ' scale(' + (Math.abs(3- (window.innerHeight - nextSibling.getBoundingClientRect().top) / window.innerHeight)) + ')';

                    } else if ( _this.mouse.start.y - _this.mouse.end.y < 0 ) {
                        elem.style.webkitTransformOrigin = '50% 100%';
                        elem.style.webkitTransform = ' scale(' + (Math.abs(1+ (window.innerHeight - prevSibling.getBoundingClientRect().top) / window.innerHeight)) + ')';
                    }

                    nextSibling.style.webkitTransform  = 'translate3d(0,'+((-window.innerHeight)+Math.round(_this.mouse.end.y - _this.mouse.start.y)) + 'px,0)';
                    prevSibling.style.webkitTransform  = 'translate3d(0,'+(window.innerHeight+Math.round(_this.mouse.end.y - _this.mouse.start.y)) + 'px,0)';

                }

            } else {
                if ( _this.opts.orientation == 'portrait' ) {

                    if (_this.mouse.start.x - _this.mouse.end.x > 0) {
                        elem.style.webkitTransformOrigin = '0% 50%';
                        elem.style.webkitTransform = 'scale(' + (Math.abs((window.innerWidth - nextSibling.getBoundingClientRect().right) / window.innerWidth)) + ')';
                    } else if ( _this.mouse.start.x - _this.mouse.end.x < 0 ) {
                        elem.style.webkitTransformOrigin = '100% 50%';
                        elem.style.webkitTransform = 'scale(' + (Math.abs( (window.innerWidth - prevSibling.getBoundingClientRect().right) / window.innerWidth)) + ')';
                    }
                    prevSibling.style.webkitTransform = 'translate3d(' + ((-window.innerWidth) + Math.round(_this.mouse.end.x - _this.mouse.start.x)) + 'px,0,0)';
                    nextSibling.style.webkitTransform = 'translate3d(' + (window.innerWidth + Math.round(_this.mouse.end.x - _this.mouse.start.x)) + 'px,0,0)';


                } else {

                    if (_this.mouse.start.x - _this.mouse.end.x > 0) {
                        elem.style.webkitTransformOrigin = '0% 50%';
                        elem.style.webkitTransform = 'scale(' + (Math.abs( (window.innerWidth - nextSibling.getBoundingClientRect().right) / window.innerWidth)) + ')';
                    } else if ( _this.mouse.start.x - _this.mouse.end.x < 0 ) {
                        elem.style.webkitTransformOrigin = '100% 50%';
                        elem.style.webkitTransform = ' scale(' + (Math.abs( (window.innerWidth - prevSibling.getBoundingClientRect().right) / window.innerWidth)) + ')';
                    }
                    prevSibling.style.webkitTransform = 'translate3d(' + ((-window.innerWidth) + Math.round(_this.mouse.end.x - _this.mouse.start.x)) + 'px,0,0)';
                    nextSibling.style.webkitTransform = 'translate3d(' + (window.innerWidth + Math.round(_this.mouse.end.x - _this.mouse.start.x)) + 'px,0,0)';
                }
            }

            nextSibling.classList.add('next');

            prevSibling.classList.add('prev');
            elem.style.webkitTransition  = 'none';
            nextSibling.style.webkitTransition  = 'none';
            prevSibling.style.webkitTransition  = 'none';

        },
        setStartCords: function (e) {

            delete _this.mouse.start.y;
            delete _this.mouse.start.x;
            delete _this.mouse.end.y;
            delete _this.mouse.end.x;

            e.touches ||  e.originalEvent ? e = e.touches[0] : null;

            _this.mouse.start.x = e.pageX || e.clientX;
            _this.mouse.start.y = e.pageY || e.clientY;

            var elem = _this.wrapper.querySelector('.active'), nextSibling, prevSibling;

            if ( elem.nextElementSibling ) {
                nextSibling = elem.nextElementSibling
            } else {
                if ( _this.wrapper.children.length === 2 ) {
                    _this.clone = elem.parentNode.children[0].cloneNode(true);
                    _this.cloned_element = elem.parentNode.children[0];
                    _this.wrapper.appendChild(_this.clone);
                    nextSibling = _this.clone;
                } else {
                    nextSibling = elem.parentNode.children[0];
                }
            }

            if ( elem.previousElementSibling ) {
                prevSibling =  elem.previousElementSibling;
            } else {
                if ( _this.wrapper.children.length === 2 ) {
                    _this.clone = elem.parentNode.children[elem.parentNode.children.length-1].cloneNode(true);
                    _this.cloned_element = elem.parentNode.children[elem.parentNode.children.length-1];
                    _this.wrapper.appendChild(_this.clone);
                    prevSibling = _this.clone;
                } else {
                    prevSibling =  elem.parentNode.children[elem.parentNode.children.length-1];

                }

            }

            nextSibling.classList.add('next');
            prevSibling.classList.add('prev');
            elem.style.webkitTransition  = 'none';
            nextSibling.style.webkitTransition  = 'none';
            prevSibling.style.webkitTransition  = 'none';

            if ( window.orientation == 0 || window.orientation == 180 ) {
                nextSibling.style.webkitTransform  = 'translate3d(0,'+((window.innerHeight)) + 'px,0)';
                prevSibling.style.webkitTransform  = 'translate3d(0,'+(-window.innerHeight) + 'px,0)';

            } else {
                nextSibling.style.webkitTransform  = 'translate3d('+((-window.innerWidth)) + 'px,0,0)';
                prevSibling.style.webkitTransform  = 'translate3d('+(window.innerWidth) + 'px,0,0)';
            }

        },

        swipeSlides: function () {
            var elem, prevSibling, nextSibling;
            if ( _this.mouse.end.y === 0 ) _this.mouse.end.y = _this.mouse.start.y;
            if ( _this.mouse.end.x === 0 ) _this.mouse.end.x = _this.mouse.start.x;

            if ( window.orientation == 0 || window.orientation == 180 ) {
                if ( _this.opts.orientation == 'portrait' ) {

                    if (_this.mouse.start.y - _this.mouse.end.y > (_this.opts.slideParameter || 100)) {
                        _this.next();
                    } else if (_this.mouse.start.y - _this.mouse.end.y < (-_this.opts.slideParameter || -100)) {
                        _this.prev();
                    } else {

                        elem = _this.wrapper.querySelector('.active');
                        prevSibling = elem.previousElementSibling ? elem.previousElementSibling : elem.parentNode.children[elem.parentNode.children.length - 1];
                        nextSibling = elem.nextElementSibling ? elem.nextElementSibling : elem.parentNode.children[0];
                        if (prevSibling.classList.contains('prev')) prevSibling.classList.remove('prev');
                        if (nextSibling.classList.contains('next')) nextSibling.classList.remove('next');
                        elem.classList.add('show');
                        if (elem.classList.contains('show')) elem.classList.remove('show');
                        prevSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        nextSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        elem.style.webkitTransform = 'translate3d(0,0,0)';

                    }
                } else {
                    if (_this.mouse.start.y - _this.mouse.end.y > (_this.opts.slideParameter || 100)) {
                        _this.prev();
                    } else if (_this.mouse.start.y - _this.mouse.end.y < (-_this.opts.slideParameter || -100)) {
                        _this.next();
                    } else {

                        elem = _this.wrapper.querySelector('.active');
                        prevSibling = elem.previousElementSibling ? elem.previousElementSibling : elem.parentNode.children[elem.parentNode.children.length - 1];
                        nextSibling = elem.nextElementSibling ? elem.nextElementSibling : elem.parentNode.children[0];
                        if (prevSibling.classList.contains('prev')) prevSibling.classList.remove('prev');
                        if (nextSibling.classList.contains('next')) nextSibling.classList.remove('next');
                        elem.classList.add('show');
                        if (elem.classList.contains('show')) elem.classList.remove('show');
                        prevSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        nextSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        elem.style.webkitTransform = 'translate3d(0,0,0)';

                    }

                }
            } else {
                if ( _this.opts.orientation == 'portrait' ) {
                    if ( _this.mouse.start.x - _this.mouse.end.x > (_this.opts.slideParameter || 100) ) {
                        _this.next();
                    } else if ( _this.mouse.start.x - _this.mouse.end.x < (-_this.opts.slideParameter || -100) ) {
                        _this.prev();
                    } else {

                        elem = _this.wrapper.querySelector('.active');
                        prevSibling = elem.previousElementSibling ? elem.previousElementSibling : elem.parentNode.children[elem.parentNode.children.length-1];
                        nextSibling = elem.nextElementSibling ? elem.nextElementSibling : elem.parentNode.children[0];
                        if (prevSibling.classList.contains('prev')) prevSibling.classList.remove('prev');
                        if (nextSibling.classList.contains('next')) nextSibling.classList.remove('next');
                        elem.classList.add('show');
                        if (elem.classList.contains('show')) elem.classList.remove('show');
                        prevSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        nextSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        elem.style.webkitTransform = 'translate3d(0,0,0)';

                    }

                } else {
                    if ( _this.mouse.start.x - _this.mouse.end.x > (_this.opts.slideParameter || 100) ) {
                        _this.next();
                    } else if ( _this.mouse.start.x - _this.mouse.end.x < (-_this.opts.slideParameter || -100) ) {
                        _this.prev();
                    } else {

                        elem = _this.wrapper.querySelector('.active');
                        prevSibling = elem.previousElementSibling ? elem.previousElementSibling : elem.parentNode.children[elem.parentNode.children.length-1];
                        nextSibling = elem.nextElementSibling ? elem.nextElementSibling : elem.parentNode.children[0];
                        if (prevSibling.classList.contains('prev')) prevSibling.classList.remove('prev');
                        if (nextSibling.classList.contains('next')) nextSibling.classList.remove('next');
                        elem.classList.add('show');
                        if (elem.classList.contains('show')) elem.classList.remove('show');
                        prevSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        nextSibling.style.webkitTransform = 'translate3d(0,0,0)';
                        elem.style.webkitTransform = 'translate3d(0,0,0)';

                    }

                }
            }
            delete _this.mouse.start.y;
            delete _this.mouse.start.x;
            delete _this.mouse.end.y;
            delete _this.mouse.end.x;

            _this.mouse_move_parameter = 0;

        },
        next: function () {

            _this.opts.container.removeEventListener('touchstart', _this.setStartCords);
            _this.opts.container.removeEventListener('touchmove', _this.onMouseMove);
            _this.opts.container.removeEventListener('touchend', _this.swipeSlides);

            var elem = _this.cleaner();

            var prevSibling = elem.previousElementSibling ? elem.previousElementSibling : elem.parentNode.children[elem.parentNode.children.length-1];
            var nextSibling = elem.nextElementSibling ? elem.nextElementSibling : elem.parentNode.children[0];
            elem.style.webkitTransition  = 'all 0.3s linear';
            prevSibling.style.webkitTransition  = 'all 0.3s linear';
            nextSibling.style.webkitTransition  = 'all 0.3s linear';

            prevSibling.style.webkitTransform = '';
            nextSibling.style.webkitTransform = '';
            elem.style.top = 0;

            elem.style.webkitTransform = 'scale(0)';

            if (prevSibling.classList.contains('prev')) prevSibling.classList.remove('prev');

            elem.classList.add('up');

            setTimeout(function(){

                nextSibling.style.top = 0;
                nextSibling.style.webkitTransform = 'translate3d(0px, 0px, 0px)';

                nextSibling.classList.remove('up');
                nextSibling.classList.remove('next');
                elem.classList.remove('active');
                elem.classList.remove('up');

                nextSibling.classList.add('active');
                if ( _this.cloned_element ) {
                    _this.cloned_element.classList.add('active');
                }
                if ( !nextSibling.classList.contains('slide-active-animation') ) {
                    nextSibling.classList.add('slide-active-animation');
                }
                if ( _this.clone ) {
                    _this.wrapper.removeChild(_this.clone);
                    _this.clone = false;
                }
                document.dispatchEvent(slideNext);
                document.dispatchEvent(slideChanged);
                nextSibling.querySelector('.image-wrapper').dispatchEvent(currentSlideChanged);

                _this.opts.container.addEventListener('touchstart', _this.setStartCords);
                _this.opts.container.addEventListener('touchmove', _this.onMouseMove);
                _this.opts.container.addEventListener('touchend', _this.swipeSlides);
                elem.style.webkitTransform = 'translate3d(0)';

            }, 600);

        },
        prev: function () {

            _this.opts.container.removeEventListener('touchstart', _this.setStartCords);
            _this.opts.container.removeEventListener('touchmove', _this.onMouseMove);
            _this.opts.container.removeEventListener('touchend', _this.swipeSlides);

            var elem = _this.cleaner();

            var prevSibling = elem.previousElementSibling ? elem.previousElementSibling : elem.parentNode.children[elem.parentNode.children.length-1];

            var nextSibling = elem.nextElementSibling ? elem.nextElementSibling : elem.parentNode.children[0];
            elem.style.webkitTransition  = 'all 0.3s linear';
            prevSibling.style.webkitTransition  = 'all 0.3s linear';
            nextSibling.style.webkitTransition  = 'all 0.3s linear';

            prevSibling.style.webkitTransform = '';
            nextSibling.style.webkitTransform = '';
            elem.style.top = 0;

            elem.style.webkitTransform = 'scale(0)';

            if (nextSibling.classList.contains('next')) nextSibling.classList.remove('next');

            prevSibling.classList.add('prev');
            setTimeout(function(){
                elem.classList.add('down');
                prevSibling.classList.add('down');
            }, 0);

            setTimeout(function(){
                prevSibling.style.top = 0;
                prevSibling.style.webkitTransform = 'translate3d(0px, 0px, 0px)';
                prevSibling.classList.remove('down');
                prevSibling.classList.remove('prev');
                elem.classList.remove('active');
                elem.classList.remove('down');

                prevSibling.classList.add('active');
                if ( _this.cloned_element ) {
                    _this.cloned_element.classList.add('active');
                }

                if ( !prevSibling.classList.contains('slide-active-animation') ) {
                    prevSibling.classList.add('slide-active-animation');
                }
                if ( _this.clone ) {
                    _this.wrapper.removeChild(_this.clone);
                    _this.clone = false;
                }
                document.dispatchEvent(slidePrev);
                document.dispatchEvent(slideChanged);
                prevSibling.querySelector('.image-wrapper').dispatchEvent(currentSlideChanged);

                _this.opts.container.addEventListener('touchstart', _this.setStartCords);
                _this.opts.container.addEventListener('touchmove', _this.onMouseMove);
                _this.opts.container.addEventListener('touchend', _this.swipeSlides);
                elem.style.webkitTransform = 'translate3d(0)';

            }, 600);
        },
        cleaner: function(){
            var i,
                elems = _this.wrapper.querySelectorAll('.active'),
                next_elems = _this.wrapper.querySelectorAll('.next'),
                prev_elems = _this.wrapper.querySelectorAll('.prev');

            for ( i = 1; i < next_elems.length; i++ ) {
                if ( next_elems[i].classList.contains('active') ) next_elems[i].classList.remove('active');
            }
            for ( i = 1; i < prev_elems.length; i++ ) {
                if ( prev_elems[i].classList.contains('active') ) prev_elems[i].classList.remove('active');
            }
            for ( i = 1; i < elems.length; i++ ) {
                if ( elems[i].classList.contains('active') ) elems[i].classList.remove('active');
            }
            return elems[0];
        },
        callback: function() {}
    };
};

