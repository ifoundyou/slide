
function AddText() {
    function css(elem,css){
        for (var j in css) {
            elem.style[j] = css[j];
        }
    }
    function cssCleaner(elem,css){
        for (var j in css) {
            elem.style[j] ='';
        }
    }

    var _this;

    return {
        init: function (opts, swiper) {
            _this = this;
            this.render(opts);
            if (swiper) {
                this.addCallback(swiper);
            }
            document.addEventListener('slideChanged', _this.closeOpenContainers)
        },
        collapsed: true,

        addClass: function (e, constructor) {
            if (constructor) {
                constructor.closeOpenContainers();
            } else {
                this.closeOpenContainers();

            }
            var elem = e.target;
            if ( elem.classList.contains('slide-active-animation') ) return;
            elem.classList.add('slide-active-animation');
        },

        render: function (opts) {
            var _this = this;

            var div = document.createElement('div'),
                div_heading = document.createElement('div'),
                div_text = document.createElement('div'),
                span = document.createElement('span'),
                touchButton = document.createElement('div'),
                h = document.createElement(opts.headingTagName),
                p = document.createElement('p');

            this.opts = opts;
            this.div = div;
            this.div_heading = div_heading;
            this.div_text = div_text;
            this.p = p;
            this.h = h;
            this.span = span;
            this.touchButton = touchButton;
            this.opts = opts;

            opts.defaultParagraphStyle = {};

            document.body.appendChild(div);

            div.classList.add(opts.elemName);
            div.classList.add(opts.setVector);
            h.style.display = 'block';
            p.innerHTML = opts.text;
            span.className = 'smallTxt-arrow txt-arrow css_sprite01';
            div_heading.className = 'text-title';
            div_text.className = 'text-detail';
            touchButton.className = 'touch-area';
            h.className = opts.headingClassName;
            h.style.wordWrap = 'normal';
            h.style.whiteSpace = 'nowrap';
            
            div_heading.appendChild(h);
            div_heading.appendChild(span);
            span.appendChild(touchButton);

            div_text.appendChild(p);

            if (opts.heading) div.appendChild(div_heading);
            if (opts.text) div.appendChild(div_text);

            css(div, opts.style);
            css(span, opts.buttonStyle );

            css(div_text, opts.paragraphStyle || opts.defaultParagraphStyle );

            var container = (opts.container);

            touchButton.style.webkitTransformStyle = 'preserve-3d';
            touchButton.style.webkitTransform = 'translate3d(0,0,100px)';



            this.touchButton.addEventListener('click', _this.applyAnimation );
            this.touchButton.addEventListener('touchend', _this.applyAnimation );

            this.countHeading();

            div_heading.style.height = h.getBoundingClientRect().height+'px';
            p.style.width = opts.textWidth+'px';

            this.primaryHeight = div_heading.getBoundingClientRect().height+'px';

            div.style.height = this.primaryHeight;
            div.style.width = this.primaryWidth;
            div.setAttribute('data-primary-width', div.style.width);
            div.setAttribute('data-primary-height', div.style.height);
            this.elemsPosition(opts.driftCourse);
            container.appendChild(div);

        },
        applyAnimation: function (){
            _this.span.classList.contains('z-toggle') ? _this.hideAnimation(this, _this.opts) : _this.showAnimation(this, _this.opts);
        },
        countHeading: function () {

            this.h.innerHTML = this.opts.heading;
            this.primaryWidth = Math.round(this.h.getBoundingClientRect().width) + 'px';

            if ( parseFloat(this.primaryWidth) > this.opts.textWidth) {
                var string = this.h.innerHTML;
                do {
                    string = string.substring(0, string.length-1);
                    this.h.innerHTML = string;

                } while ( this.h.getBoundingClientRect().width >= this.opts.textWidth );

                string = string.substring(0, string.length-3);
                string += '...';
                this.h.innerHTML = string;
                this.primaryWidth = this.opts.textWidth + 'px';
            }
        },
        reRender: function(opts) {


            this.opts = opts;
            this.p.style.width = this.opts.textWidth+'px';
            this.p.style.height = '';

            if ( this.p.getBoundingClientRect().height > this.opts.container.getBoundingClientRect().height - this.div_heading.getBoundingClientRect().height ) {
                this.p.style.height = this.opts.container.getBoundingClientRect().height - this.div_heading.getBoundingClientRect().height + 'px';
            }

            this.div_text.style.height = this.div_text.querySelector('p').getBoundingClientRect().height+'px';

            if ( this.collapsed ) {
                this.div.style.height = this.div_heading.getBoundingClientRect().height + 'px';

            } else {
                var param = this.div_heading.getBoundingClientRect().height + this.p.getBoundingClientRect().height;
                if ( param > this.opts.container.getBoundingClientRect().height ) {
                    this.div.style.height = this.opts.container.getBoundingClientRect().height + 'px';
                } else {
                    this.div.style.height = this.div_heading.getBoundingClientRect().height + this.p.getBoundingClientRect().height+ 'px';
                }
            }
            this.countHeading();
            if ( this.collapsed ) {
                cssCleaner( this.div, this.opts.style);
                css( this.div, this.opts.style);
            }

        },
        initListeners: function() {
            var _this = this;
                this.touchButton.addEventListener('click', _this.applyAnimation);
            ;
                this.touchButton.addEventListener('touchend', _this.applyAnimation);
        },
        elemsPosition: function(position){
            switch (position) {
                case 'down':
                    this.p.style.webkitTransform = 'translate3d(0px, -'+ this.p.getBoundingClientRect().height+'px,0)';
                    this.p.style.webkitTransform = 'translate3d(0px, -'+ this.p.getBoundingClientRect().height+'px,0)';
                    this.p.style.paddingTop = 0;
                    this.div_text.style.top = this.div_heading.getBoundingClientRect().height+'px';
                    break;
                case 'up':
                    this.p.style.webkitTransform = 'translate3d(0px, '+ this.p.getBoundingClientRect().height+'px,0)';
                    this.div_text.style.bottom = this.div_heading.getBoundingClientRect().height+'px';
                    this.p.style.paddingBottom = 0;
                    this.div_heading.style.bottom = 0+'px';
                    break;
            }
        },

        hideAnimation: function(elem, opts){

            elem.parentElement.classList.remove('z-toggle');
            this.div_text.classList.remove('action');
            this.div_text.classList.remove('z-show');
            this.collapsed = true;

            switch (opts.driftCourse) {
                case 'down':
                    this.p.style.webkitTransform = 'translate3d(0px, -'+ this.p.getBoundingClientRect().height+'px,0)';
                    break;
                case 'up':
                    this.p.style.webkitTransform = 'translate3d(0px, '+ this.p.getBoundingClientRect().height+'px,0)';
                    break;
            }
            this.div.style.height = this.primaryHeight;
            this.div.style.width = this.primaryWidth;
            css(this.div, this.opts.style);

        },

        showAnimation: function(elem){
            elem.parentElement.classList.add('z-toggle');

            this.closeOpenContainers();

            this.p.style.webkitTransform = 'translate3d(0px, 0px,0px)';
            this.div_text.classList.add('action');
            this.div_text.classList.add('z-show');


            if ( window.orientation == 0 || window.orientation == 180 ) {
                var param = this.div_heading.getBoundingClientRect().height + this.p.getBoundingClientRect().height;

                if ( param > this.opts.container.getBoundingClientRect().height ) {
                    this.div.style.height = this.opts.container.getBoundingClientRect().height + 'px';
                } else {
                    this.div.style.height = this.div_heading.getBoundingClientRect().height + this.p.getBoundingClientRect().height+ 'px';
                }

                this.div.style.width = this.p.getBoundingClientRect().width + 'px';
                this.div_text.style.height = this.div_text.querySelector('p').getBoundingClientRect().height+'px';

            } else {
                var param = this.div_heading.getBoundingClientRect().height + this.p.getBoundingClientRect().height;

                this.div.style.height = this.div_heading.getBoundingClientRect().width +this.p.getBoundingClientRect().width + 'px';

                this.div_text.style.height = this.div_text.querySelector('p').getBoundingClientRect().width+'px';

                    this.div.style.width = this.p.getBoundingClientRect().height+ 'px';

            }


            if ( this.div.getBoundingClientRect().width + parseFloat(this.div.style.left) > this.opts.container.getBoundingClientRect().width ) {
                this.div.style.webkitTransition = 'all 1s';
                this.div.style.transition = 'all 1s';
                this.div.style.left = parseFloat(this.div.style.left) - (this.div.getBoundingClientRect().width + parseFloat(this.div.style.left) - this.opts.container.getBoundingClientRect().width) + 'px';
                this.div.style.webkitTransition = '';
                this.div.style.transition = '';
            }
            if ( this.div.getBoundingClientRect().width + parseFloat(this.div.style.right) > this.opts.container.getBoundingClientRect().width ) {
                this.div.style.webkitTransition = 'all 1s';
                this.div.style.transition = 'all 1s';
                this.div.style.left = parseFloat(this.div.style.right) - (this.div.getBoundingClientRect().width + parseFloat(this.div.style.right) - this.opts.container.getBoundingClientRect().width) + 'px';
                this.div.style.webkitTransition = '';
                this.div.style.transition = '';
            }
            if ( this.div.getBoundingClientRect().height + parseFloat(this.div.style.top) > this.opts.container.getBoundingClientRect().height ) {
                this.div.style.top = parseFloat(this.div.style.top) - (this.div.getBoundingClientRect().height + parseFloat(this.div.style.top) - this.opts.container.getBoundingClientRect().height) + 'px';
            }
            if ( this.div.getBoundingClientRect().height + parseFloat(this.div.style.bottom) > this.opts.container.getBoundingClientRect().height ) {
                this.div.style.top = parseFloat(this.div.style.bottom) - (this.div.getBoundingClientRect().height + parseFloat(this.div.style.bottom) - this.opts.container.getBoundingClientRect().height) + 'px';
            }
        },

        closeOpenContainers: function() {
            var action_array = document.querySelectorAll('.action.z-show');
            this.collapsed = false;

            if (action_array) {
                for (var i = 0; i < action_array.length; i++) {
                    action_array[i].classList.remove('action');
                    action_array[i].classList.remove('z-show');
                    action_array[i].parentElement.querySelector('.smallTxt-arrow').classList.remove('z-toggle');
                    action_array[i].style.height = '0px';
                    action_array[i].parentElement.style.height = action_array[i].parentElement.getAttribute('data-primary-height');
                    action_array[i].parentElement.style.width = action_array[i].parentElement.getAttribute('data-primary-width');
                }
            }
        },

        getHeight: function(elem, opts){
            return (elem.lineHeight == 'normal') ?
                parseInt(elem.fontSize)*1.2*opts.rows+'px' :
                    elem.lineHeight / elem.lineHeight ?
                parseInt(elem.fontSize)*elem.lineHeight*opts.rows+'px' :
                /px$/.test(elem.lineHeight) ?
                    parseInt(elem.lineHeight)*opts.rows+'px' :
                    parseInt(elem.fontSize)*parseInt(elem.lineHeight)/100*opts.rows +'px'
        }
    }
}
