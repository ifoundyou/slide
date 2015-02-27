
window.orientation = 0;

function Cut() {
    var _this;
    return {
        init: function(opts) {
            _this = this;
            this.render(opts);

        },

        render: function(opts) {
            var div = document.createElement('div');
            div.classList.add('m-img');
            div.style.backgroundImage = 'url(./img/loading_icon.gif)';
            div.style.backgroundPosition = '50% 50%';

            var image = new Image();
            image.src = opts.cropped_image.url;
            image.addEventListener('load', function() {
                div.style.backgroundSize = 'cover';
                div.style.backgroundImage = 'url('+this.src+')';

            });
            opts.container.appendChild(div);
        }
    }
}

function Slider (opts){

    this.opts = opts;

    var currentSlideChanged = document.createEvent('Event');
    currentSlideChanged.initEvent('currentSlideChanged');


    var sliderBuilt = document.createEvent('Events'),
        eventYoch = document.createEvent('MouseEvents'),
        touchstart = document.createEvent('Events'),
        touchmove = document.createEvent('Events'),
        slideChanged = document.createEvent('Event');

    sliderBuilt.initEvent('sliderBuilt');
    eventYoch.initMouseEvent('click');
    touchstart.initEvent('touchstart');
    touchmove.initEvent('touchmove');
    slideChanged.initEvent('slideChanged');

    var _this =this,
        container = document.createElement('section'),
        parent_swiper_container = document.createElement('div'),
        wrapper = document.createElement('div'),
        left_sidebar = document.createElement('section'),
        slide_list = document.createElement('div'),
        slide_wrapper = document.createElement('div'),
        slidesContainer = document.createElement('div'),
        stripes_button = document.createElement('div'),
        drops_button = document.createElement('div'),
        swiper_container = document.createElement('div'),
        right_sidebar = document.createElement('div');

    container.classList.add('container');
    parent_swiper_container.classList.add('swiper-container');
    wrapper.classList.add('wrapper');
    left_sidebar.classList.add('nav-slide');
    left_sidebar.classList.add('sw-left-sidebar');
    slide_list.classList.add('slide-list');
    slide_wrapper.classList.add('slide-wrapper');
    slidesContainer.classList.add('sw-container');
    slidesContainer.classList.add('nav-slide');
    slidesContainer.classList.add('p-index');
    stripes_button.id = 'stripes_button';
    drops_button.id = 'drops_button';
    swiper_container.classList.add('sw-wrapper');
    right_sidebar.classList.add('nav-slide');
    right_sidebar.classList.add('sw-right-sidebar');
    right_sidebar.classList.add('menu-list');

    slide_list.appendChild(slide_wrapper);
    left_sidebar.appendChild(slide_list);
    slidesContainer.appendChild(stripes_button);
    slidesContainer.appendChild(drops_button);
    slidesContainer.appendChild(swiper_container);
    wrapper.appendChild(left_sidebar);
    wrapper.appendChild(slidesContainer);
    wrapper.appendChild(right_sidebar);
    parent_swiper_container.appendChild(wrapper);
    container.appendChild(parent_swiper_container);

    container.style.opacity = 0;

    document.body.insertBefore(container, document.body.firstChild);

    opts.effects.forEach(function(effect ) {
        var obj;

        var func = eval(effect.name);

        if ( typeof  func === 'function' ) {
            obj = new func();
        } else {
            obj = func;
        }

        effect.options.container = slidesContainer;
        obj.initGlobal(effect.options);
    });


    var cookie =  _this.getCookie(opts.id);
    cookie ? cookie =  JSON.parse(cookie) : false;
    opts.pages.forEach(function(elem, i ) {

        var section = document.createElement('section'),
            corrector_div = document.createElement('div'),
            div = document.createElement('div');
        section.classList.add('sw-slide');
        corrector_div.classList.add('corrector');

        if ( typeof cookie !== 'undefined'  && typeof cookie.current_slide != 'undefined' && cookie.current_slide == i ) {
            div.setAttribute('data-loaded','load-start');
            section.classList.add('active');
        } else if ( typeof cookie === 'undefined' && i == 0 || typeof cookie !== 'undefined' && typeof cookie.current_slide !== 'undefined' && cookie.current_slide > (opts.pages.length -1) ) {
            section.classList.add('active');
            div.setAttribute('data-loaded','load-start');
        } else {
            div.setAttribute('data-loaded', 'unloaded')
        }
        div.classList.add('image-wrapper');

        if ( !elem.effects ) return;
        section.appendChild(corrector_div);
        section.appendChild(div);

        elem.orientation = opts.orientation;
        elem.index = i;
        elem.container = div;
        _this.effects_lazy_load.storage.push(elem);

        setTimeout(function () {
            _this.rotateSection(div);
        }, 400);

        swiper_container.appendChild(section);

        if ( opts.pages.length - 1 == i  ) {
            var verticalSwiperNestedSwContainer =  new PagesSlider();
            verticalSwiperNestedSwContainer.init({
                orientation: opts.orientation,
                container: swiper_container,
                wrapper: swiper_container,
                slide: opts.slideClass,
                rotate: 'horizontal',
                slideParameter: 50,
                callback: function() {
                    pagecounter.pageNumber();
                    progressline.progressWidth();
                }
            });
            _this.effects_lazy_load.run();
            document.dispatchEvent(sliderBuilt);
        }
        window.addEventListener('orientationchange', function() {
            setTimeout(function(){
                _this.rotateSection(div);

            }, 400);
        });
    });

    var elems = [ stripes_button, drops_button];

    var div_menu = document.createElement('div'),
        ul_menu_wrapper = document.createElement('div');
        ul_menu = document.createElement('ul');

    div_menu.className = 'menu-container';
    ul_menu.className = 'menu-wrapper';
    ul_menu_wrapper.style.webkitTransform = 'translate3d(0,0,0)';

    var defaults = {
        slideClass: 'swipe-slide-item',
        menu: [
            {
                tagName: 'div',
                innerHTML: 'Lorem ipsum',
                attributes: {
                    href: '#'
                }
            }
        ]
    };

    opts = opts || {};

    for (var prop in defaults) {
        if (prop in opts && typeof opts[prop] === 'object') {
            for (var subProp in defaults[prop]) {
                if (! (subProp in opts[prop])) {
                    opts[prop][subProp] = defaults[prop][subProp];
                }
            }
        }
        else if (! (prop in opts)) {
            opts[prop] = defaults[prop];
        }
    }

    opts.menu.forEach(function(item){
        var li = document.createElement('li'),
            elem = document.createElement( item.tagName || defaults.menu[0].tagName);
        li.className = 'menu-slide';
        elem.innerHTML = item.innerHTML;
        for ( var attr in item.attributes) {
            elem.setAttribute( attr , item.attributes[attr]);
        }
        li.appendChild(elem);
        ul_menu.appendChild(li);
    });
    ul_menu_wrapper.appendChild(ul_menu);
    div_menu.appendChild(ul_menu_wrapper);

    right_sidebar.appendChild(div_menu);

    ul_menu_wrapper.style.height = ul_menu.getBoundingClientRect().height + 'px';
    ul_menu_wrapper.style.width = ul_menu.getBoundingClientRect().height + 'px';

    function setBlockSizes() {
        if ( opts.orientation == 'portrait' ) {
            if ( window.orientation == 0 || window.orientation == 180 || !window.orientation) {
                container.style.width = window.innerWidth+"px";
                container.style.height = window.innerHeight+"px";
                left_sidebar.style.width = Math.round(window.innerWidth*0.7)+"px";
                left_sidebar.style.height = window.innerHeight+"px";
                slide_wrapper.style.width = Math.round(window.innerWidth*0.7)+"px";
                slidesContainer.style.width = window.innerWidth+"px";
                slidesContainer.style.height = window.innerHeight+"px";
                right_sidebar.style.width = window.innerWidth*0.7+"px";
                right_sidebar.style.height = window.innerHeight+"px";
                wrapper.style.width = parseFloat(left_sidebar.style.width) + parseFloat(slidesContainer.style.width) + parseFloat(right_sidebar.style.width) + 'px';
                slide_list.style.height = window.innerHeight - 60 + 'px';
                slide_list.style.width = window.innerWidth*0.7 + 'px';

                ul_menu_wrapper.style.float = 'none';
                _this.rotateSection(ul_menu);
            } else {
                container.style.width = window.innerWidth+"px";
                container.style.height = window.innerHeight+"px";
                left_sidebar.style.width = window.innerWidth+"px";
                left_sidebar.style.height = Math.round(window.innerHeight*0.7)+"px";
                slide_wrapper.style.width = Math.round(window.innerWidth)+"px";
                slidesContainer.style.width = window.innerWidth+"px";
                slidesContainer.style.height = window.innerHeight+"px";
                right_sidebar.style.width = window.innerWidth+"px";
                right_sidebar.style.height = window.innerHeight*0.7+"px";
                wrapper.style.width = parseFloat(slidesContainer.style.width) + 'px';
                slide_list.style.width = window.innerWidth - 30 + 'px';
                ul_menu_wrapper.style.float = 'right';
                _this.rotateSection(ul_menu);
            }
        } else {
            if ( window.orientation == 90 || window.orientation == -90 ) {
                container.style.width = window.innerWidth+"px";
                container.style.height = window.innerHeight+"px";
                left_sidebar.style.width = Math.round(window.innerWidth)+"px";
                left_sidebar.style.height = window.innerHeight*0.7+"px";
                slide_wrapper.style.width = Math.round(window.innerWidth*0.7)+"px";
                slidesContainer.style.width = window.innerWidth+"px";
                slidesContainer.style.height = window.innerHeight+"px";
                right_sidebar.style.width = window.innerWidth+"px";
                right_sidebar.style.height = window.innerHeight*0.7+"px";
                wrapper.style.width = parseFloat(slidesContainer.style.width) + 'px';
                slide_list.style.width = window.innerWidth - 30 + 'px';

                ul_menu_wrapper.style.float = 'right';
                _this.rotateSection(ul_menu);
            } else {
                container.style.width = window.innerWidth+"px";
                container.style.height = window.innerHeight+"px";
                left_sidebar.style.width = Math.round(window.innerWidth*0.7)+"px";
                left_sidebar.style.height = window.innerHeight+"px";
                slide_wrapper.style.width = Math.round(window.innerWidth*0.7)+"px";
                slidesContainer.style.width = window.innerWidth+"px";
                slidesContainer.style.height = window.innerHeight+"px";
                right_sidebar.style.width = window.innerWidth*0.7+"px";
                right_sidebar.style.height = window.innerHeight+"px";
                slide_list.style.width = window.innerWidth*0.7 + 'px';
                wrapper.style.width = parseFloat(left_sidebar.style.width) + parseFloat(slidesContainer.style.width) + parseFloat(right_sidebar.style.width) + 'px';
                ul_menu_wrapper.style.float = 'none';
                _this.rotateSection(ul_menu);
            }
        }
    }

    setBlockSizes();

    left_sidebar.addEventListener('touchmove', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    left_sidebar.addEventListener('touchend', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    right_sidebar.addEventListener('touchmove', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    right_sidebar.addEventListener('touchend', function(e){
        e.preventDefault();
        e.stopPropagation();
    });

    function center(param) {
        if ( left_sidebar.classList.contains('wrapper-active')) left_sidebar.classList.remove('wrapper-active');
        if (right_sidebar.classList.contains('wrapper-active')) right_sidebar.classList.remove('wrapper-active');
        slidesContainer.classList.add('wrapper-active');
        if ( opts.orientation == 'portrait' ) {
            if ( window.orientation == 0 || window.orientation == 180 || !window.orientation) {
                wrapper.style.webkitTransform = 'translate3d(-'+(left_sidebar.style.width)+',0,0)';
                if (param) {
                    wrapper.style.webkitTransition = param;
                } else {
                    wrapper.style.webkitTransition = 'all 0.5s ease';
                }
            } else {
                wrapper.style.webkitTransform = 'translate3d(0,-'+(left_sidebar.style.height)+',0)';
                if (param) {
                    wrapper.style.webkitTransition = param;
                } else {
                    wrapper.style.webkitTransition = 'all 0.5s ease';
                }
            }
        } else {
            if ( window.orientation == 90 || window.orientation == -90 || window.orientation) {
                wrapper.style.webkitTransform = 'translate3d(0,-'+(left_sidebar.style.height)+',0)';
                if (param) {
                    wrapper.style.webkitTransition = param;
                } else {
                    wrapper.style.webkitTransition = 'all 0.5s ease';
                }
            } else {
                wrapper.style.webkitTransform = 'translate3d(-'+(left_sidebar.style.width)+',0,0)';
                if (param) {
                    wrapper.style.webkitTransition = param;
                } else {
                    wrapper.style.webkitTransition = 'all 0.5s ease';
                }
            }
        }
    }

    function showPreviews() {
        if ( slidesContainer.classList.contains('wrapper-active')) slidesContainer.classList.remove('wrapper-active');
        left_sidebar.classList.add('wrapper-active');
        wrapper.style.webkitTransform = 'translate3d(0,0,0)';
        wrapper.style.webkitTransition = 'all 0.5s ease';
    }

     function showMenu() {

         if ( slidesContainer.classList.contains('wrapper-active')) slidesContainer.classList.remove('wrapper-active');
         right_sidebar.classList.add('wrapper-active');
         if ( opts.orientation == 'portrait' ) {
             if ( window.orientation == 0 || window.orientation == 180 || !window.orientation) {
                 wrapper.style.webkitTransform = 'translate3d(-'+(parseFloat(left_sidebar.style.width) + parseFloat(right_sidebar.style.width) + 'px')+',0,0)';
                 wrapper.style.webkitTransition = 'all 0.5s ease';
             } else {
                 wrapper.style.webkitTransform = 'translate3d(0,-'+(parseFloat(left_sidebar.style.height) + parseFloat(right_sidebar.style.height) + 'px')+',0)';
                 wrapper.style.webkitTransition = 'all 0.5s ease';
             }
         } else {
             if ( window.orientation == 90 || window.orientation == -90 || window.orientation) {
                 wrapper.style.webkitTransform = 'translate3d(0,-'+(parseFloat(left_sidebar.style.height) + parseFloat(right_sidebar.style.height) + 'px')+',0)';
                 wrapper.style.webkitTransition = 'all 0.5s ease';
             } else {
                 wrapper.style.webkitTransform = 'translate3d(-'+(parseFloat(left_sidebar.style.width) + parseFloat(right_sidebar.style.width) + 'px')+',0,0)';
                 wrapper.style.webkitTransition = 'all 0.5s ease';
             }
         }
     }

    div_menu.style.height = window.innerHeight-(parseFloat(getComputedStyle( div_menu ).padding)*2)+"px";

    var div = document.createElement('div');

    var previews_storage = [];
    var lazy_preview_load = {
        run: function() {
            var trigger = true;
            if ( !trigger ) return;
            this.preview_index = 0;
            this.loadElem();
        },
        loadElem: function() {
            if ( !previews_storage[0] ) {
                return;
            }
            var image = previews_storage[0].img,
                _this = this;
            image.src = previews_storage[0].url;
            image.addEventListener('load', function() {
                previews_storage[0].wrapper.appendChild(image);
                previews_storage[0].elem.appendChild(previews_storage[0].wrapper);
                _this.preview_index++;
                previews_storage.shift();

                _this.loadElem();
            });
        },
        preview_index: 0
    };

    function renderPreviews() {
        slide_wrapper.innerHTML = '';

        var div = document.createElement('div');

        for (var i = 0; i < opts.pages.length; i++) {

            var elem = document.createElement('div'),
                elem_image = document.createElement('img');

            elem.style.width = window.innerWidth*0.3+"px";
            elem.style.height = window.innerWidth*0.3*window.innerHeight/window.innerWidth+"px";
            elem.style.margin = '5px';
            elem.className = 'show-elem';
            div.className = 'slide-slide';

            if ( i % 2 == 0 && i != 0 ) {
                slide_wrapper.appendChild(div);
                div = document.createElement('div');
                div.style.height = window.innerWidth*0.3*window.innerHeight/window.innerWidth+10+"px";
                div.className = 'slide-slide';
            }


            if ( opts.orientation == 'portrait' ) {
                if ( window.orientation == 0 || window.orientation == 180 ) {
                    elem_image.style.width = window.innerWidth*0.3+"px";
                    elem_image.style.height = window.innerWidth*0.3*window.innerHeight/window.innerWidth+"px";
                    div.style.height = window.innerWidth*0.3*window.innerHeight/window.innerWidth+10+"px";
                    div.style.float ='none';
                } else {
                    div.style.height = window.innerHeight*0.7+"px";
                    div.style.width = window.innerHeight*0.7+"px";
                    div.style.float ='right';
                    elem_image.style.width = window.innerWidth*0.3*window.innerHeight/window.innerWidth+"px";
                    elem_image.style.height = window.innerWidth*0.3+"px";
                    elem_image.style.webkitTransform = 'translate('+elem_image.style.height+',0) rotate(90deg)';
                    elem_image.style.webkitTransformOrigin = '0% 0%';
                }
            } else {
                if ( window.orientation == 0 || window.orientation == 180 ) {
                    elem_image.style.width = window.innerWidth*0.3+"px";
                    elem_image.style.height = window.innerWidth*0.3*window.innerHeight/window.innerWidth+"px";
                    div.style.height = window.innerWidth*0.3*window.innerHeight/window.innerWidth+10+"px";
                    div.style.float ='none';
                } else {
                    div.style.height = window.innerHeight*0.7+"px";
                    div.style.width = window.innerHeight*0.7+"px";
                    div.style.float ='right';
                    elem_image.style.width = window.innerWidth*0.3*window.innerHeight/window.innerWidth+"px";
                    elem_image.style.height = window.innerWidth*0.3+"px";
                    elem_image.style.webkitTransform = 'translateX('+elem_image.style.height+') rotate(90deg)';
                    elem_image.style.webkitTransformOrigin = '0% 0%';
                }
            }
            if ( i+1 == opts.pages.length ) {
                div.className = 'slide-slide';
                slide_wrapper.appendChild(div);
                if ( window.orientation == 0 || window.orientation == 180 ) {
                    slide_wrapper.style.height = slide_wrapper.children.length * div.getBoundingClientRect().height + 'px';
                } else {

                    slide_wrapper.style.width = slide_wrapper.children.length * div.getBoundingClientRect().height + 'px';
                }
            }

            previews_storage.push({
                elem: div,
                wrapper: elem,
                img: elem_image,
                url: opts.pages[i].preview,
                orientation: opts.orientation
            });

            (function(i){
                var a;
                elem.addEventListener('touchstart', function(e) {
                    a = e.target;
                });

                elem.addEventListener('touchmove', function(e) {
                    a = false;
                });
                elem.addEventListener('touchend', function(e) {
                    if ( a != e.target ) return;
                    swiper_container.querySelector('.active').classList.remove('active');
                    if ( swiper_container.children[i].querySelector('.image-wrapper').getAttribute('data-loaded') != 'loaded' ) {
                        _this.effects_lazy_load.bumpLoadImage(swiper_container.children[i].querySelector('.image-wrapper'));
                    }
                    swiper_container.children[i].classList.add('active');
                    swiper_container.children[i].querySelector('.image-wrapper').dispatchEvent(currentSlideChanged);

                    document.dispatchEvent(slideChanged);

                    if ( !swiper_container.children[i].classList.contains('slide-active-animation') ) {
                        setTimeout(function(){
                            swiper_container.children[i].classList.add('slide-active-animation');
                        },100);
                    }
                    a = false;
                    pagecounter.pageNumber();
                    progressline.progressWidth();
                });
            })(i);
        }

        lazy_preview_load.run();

    }

    var addClassToActive = document.createEvent('Event');
    addClassToActive.initEvent('addClassToActive');

    var videoStop =  document.createEvent('Event');
    videoStop.initEvent('videoStop');

    var arrowShow =  document.createEvent('Event');
    arrowShow.initEvent('arrowShow', false, false);

    var arrowHide =  document.createEvent('Event');
    arrowHide.initEvent('arrowHide', false, false);

    var closeOpenContainers =  document.createEvent('Event');
    closeOpenContainers.initEvent('closeOpenContainers', false, false);

    var canvasEvent =  document.createEvent('Event');
    canvasEvent.initEvent('canvasEvent', false, false);

    document.addEventListener('slideChanged', function() {
      var videos = document.querySelectorAll('video');

        document.dispatchEvent(canvasEvent);
        progressline.progressWidth();
        pagecounter.pageNumber();
        for (var i = 0; i < videos.length; i++) {
            videos[i].pause();
        }
    });

    var verticalSwiperNestedMenuContainer = new _this.sidebarSlider();
    verticalSwiperNestedMenuContainer.init(slide_list,slide_wrapper);
    var verticalSwiperNestedMenuContainer = new _this.sidebarSlider();
    verticalSwiperNestedMenuContainer.init(div_menu,ul_menu_wrapper);

    function stipesButtonTouch(e) {
        e.preventDefault();
        e.stopPropagation();

        if ( slidesContainer.classList.contains('wrapper-active')) {
            showPreviews();
        } else {
            center();
        }
    }
    function stipesDropsTouch(e) {
        e.preventDefault();
        e.stopPropagation();

        if ( slidesContainer.classList.contains('wrapper-active')) {
            showMenu();
        } else {
            center();
        }
    }

    function containerTouchend (e) {
        e.preventDefault();
//        e.stopPropagation();

        pagecounter.pageNumber();
        progressline.progressWidth();
        if ( slidesContainer.classList.contains('wrapper-active')) return;
        center();
    }

    function containerTouchmove(e) {
        e.preventDefault();
//        e.stopPropagation();
    }

    stripes_button.addEventListener('touchend', stipesButtonTouch);
    slidesContainer.addEventListener('touchend', containerTouchend);
    slidesContainer.addEventListener('touchmove', containerTouchmove);
    drops_button.addEventListener('touchend', stipesDropsTouch);
    document.addEventListener('showElementsEvent', showElems);
    document.addEventListener('hideElementsEvent', hideElems);

    function showElems() {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.display = 'block';
        }
    }

    function hideElems() {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.display = 'none';
        }
    }

    var progressline = new Progressline();
    progressline.init({
        slide: '.sw-slide',
        activeSlide: '.active'
    });

    var pagecounter = new PageCounter();
    pagecounter.init({
        slide: '.sw-slide',
        activeSlide: '.active',
        container: left_sidebar
    });

    var arrow = new AddArrow();
    arrow.init({
        container: slidesContainer,
        elemName: 'div',
        elemStyle: {
            display: 'block'
        },
        imageTagName: 'div',
        imageStyle: {},
        elemClassName: 'arrow',
        arrowImgSrc:'url(./img/css_sprite01.png)'
    });

    document.addEventListener('slideChanged', function(){
        var cookie = '';
        for (var i = 0; i < swiper_container.children.length; i++ ) {
            if ( swiper_container.children[i].classList.contains('active') ) {
                cookie = JSON.stringify({
                    current_slide: i
                });
                _this.setCookie( opts.id , cookie, {expires: opts.timing_last_slide || 300});
                break;
            }
        }

    });

    setTimeout(function(){
        setBlockSizes();

        renderPreviews();

        center('all 0s ease');
        container.style.opacity = 1;
    },400);

    var timer_id;

    window.addEventListener('orientationchange', function() {

        container.style.opacity = 0;

        clearTimeout(timer_id);

        timer_id = setTimeout(function(){
            setBlockSizes();

            renderPreviews();

            center('all 0s ease');
            container.style.opacity = 1;

        },400);
    });
}


Slider.prototype.rotateSection = function (section) {
    section.style.position = 'absolute';
    if ( this.opts.orientation == 'portrait' ) {
        if ( window.orientation == 0 || window.orientation == 180 || !window.orientation) {
            section.style.width = window.innerWidth + 'px';
            section.style.height = window.innerHeight + 'px';
            section.style.left = '0%';
            section.style.webkitTransform = 'rotate(0deg)';
            section.style.webkitTransformOrigin = '0% 0%';
        } else {
            section.style.width = window.innerHeight + 'px';
            section.style.height = window.innerWidth + 'px';
            section.style.left = '100%';
            section.style.webkitTransform = 'rotate(90deg)';
            section.style.webkitTransformOrigin = '0% 0%';
        }
    } else {
        if ( window.orientation == 0 || window.orientation == 180 ) {
            section.style.width = window.innerHeight + 'px';
            section.style.height = window.innerWidth + 'px';
            section.style.top = '100%';
            section.style.webkitTransform = 'rotate(-90deg)';
            section.style.webkitTransformOrigin = '0% 0%';
        } else {
            section.style.width = window.innerWidth + 'px';
            section.style.height = window.innerHeight + 'px';
            section.style.top = '0%';
            section.style.webkitTransform = 'rotate(0deg)';
            section.style.webkitTransformOrigin = '0% 0%';
        }
    }
};


Slider.prototype.sidebarSlider = function () {
    var _this, startX, startY, xCoord = 0, yCoord = 0;

    return {
        opts: {},
        elems: {},
        init: function(wrapper, bar) {

            _this = this;
            _this.elems.bar = bar;
            _this.elems.wrapper = wrapper;
            bar.addEventListener('touchstart', _this.onTouchStart);
            bar.addEventListener('touchmove', _this.onTouchMove);
            bar.addEventListener('touchend', _this.onTouchEnd);
            window.addEventListener('orientationchange', function(){
                _this.cleaner();
            });

        },

        onTouchStart: function(e) {

            e.touches ||  e.originalEvent ? e = e.touches[0] : null;

            startX = e.pageX;
            startY = e.pageY;
        },

        onTouchMove: function(e) {

            e.touches ||  e.originalEvent ? e = e.touches[0] : null;
            var currentX = e.pageX,
                currentY = e.pageY,
                difference;
            _this.elems.bar.style.webkitTransition = 'all 0s linear';
            _this.elems.bar.style.transition = 'all 0s linear';
            _this.elems.bar.style.webkitTransition = 'all 0s linear';
            _this.elems.bar.style.transition = 'all 0s linear';

            if ( window.orientation == 0 || window.orientation == 180 ) {
                if ( !startY ) startY = currentY;
                yCoord +=  (currentY-startY) ;
                if ( yCoord > 0) yCoord = 0;
                difference = _this.elems.wrapper.getBoundingClientRect().height - _this.elems.bar.getBoundingClientRect().height;
                if (difference > 0 ) difference = 0;
                if ( yCoord < difference ) yCoord = difference;
                _this.elems.bar.style.webkitTransform = 'translate3d(0,' + yCoord + 'px,0)';
            } else {
                if ( !startX ) startX = currentX;
                xCoord +=  (currentX-startX) ;
                if ( xCoord < 0) xCoord = 0;
                difference = _this.elems.bar.getBoundingClientRect().width - _this.elems.wrapper.getBoundingClientRect().width;
                if ( difference < 0 ) difference = 0;
                if ( xCoord > difference) xCoord = difference;
                _this.elems.bar.style.webkitTransform = 'translate3d(' + xCoord + 'px,0,0)';
            }
            startX = currentX;
            startY = currentY;
        },
        onTouchEnd: function(e) {

        },
        cleaner: function() {
            _this.elems.bar.style.webkitTransform = 'translate3d(0,0,0)';
            xCoord = 0;
            yCoord = 0;
        }
    }

};

Slider.prototype.getCookie = function (name) {
    name+='';
    var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

Slider.prototype.setCookie = function (name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for(var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
};

Slider.prototype.effects_lazy_load = {
    storage: [],
    firstSlideIndicator: false,
    run: function() {

        var _this = this;
        document.addEventListener('slideNext', function () {
            _this.loadNext();
        });
        document.addEventListener('slidePrev', function () {
            _this.loadPrev();
        });

        var _storage = [];

        _this.storage.forEach(function(obj, i) {

            if ( obj.container.getAttribute('data-loaded') == 'load-start') {

                _this.renderSlide(_this.storage[i]);

                _storage = _this.storage.splice( i, _this.storage.length - i );
                _storage.shift();

                _this.storage = _storage.concat(_this.storage);
                _this.loadPrev();
                _this.loadNext();

            }
        });
        _this.firstSlideIndicator = true;
    },

    renderSlide: function (elem) {
        elem.effects.forEach(function(effect ) {

            var obj;
            var func = eval(effect.name);
            if ( typeof  func === 'function' ) {
                obj = new func();
            } else {
                obj = func;
            }

            effect.options.index = elem.index;
            effect.options.width = window.innerWidth;
            effect.options.height = window.innerHeight;
            effect.options.container = elem.container;

            obj.init(effect.options);
            elem.container.setAttribute('data-loaded', 'loaded');
        });
    },

    loadNext: function(){

        if ( this.storage.length === 0 ) return;
        this.renderSlide(this.storage[0]);
        this.storage.shift();
        if ( this.firstSlideIndicator ) {
            this.firstSlideIndicator = false;
            this.loadPrev();
            this.loadNext();
        }
    },
    loadPrev: function(){

        if ( this.storage.length === 0 ) return;
        this.renderSlide(this.storage[this.storage.length-1]);
        this.storage.pop();
        if ( this.firstSlideIndicator ) {
            this.firstSlideIndicator = false;
            this.loadPrev();
            this.loadNext();
        }
    },
    bumpLoadImage: function( elem ) {
        var _this = this;
        this.storage.forEach(function(obj, i){
            if ( obj.container == elem ) {
                _this.renderSlide(obj);
                _this.storage.splice(i,1);
            }
        })
    }
};
