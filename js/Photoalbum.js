function PhotoAlbum (opts){
    function animate(opts) {

        var start = new Date;
        var delta = opts.delta || linear;

        var timer = setInterval(function() {
            var progress = (new Date - start) / opts.duration;

            if (progress > 1) progress = 1;

            opts.step( delta(progress) );

            if (progress == 1) {
                clearInterval(timer);
                opts.complete && opts.complete();
            }
        }, opts.delay || 13);

        return timer;
    }

    function linear(progress) {
        return progress
    }
    function circ(progress) {
        return 1 - Math.sin(Math.acos(progress))
    }
    function quint(progress) {
        return Math.pow(progress, 5)
    }
    function makeEaseOut(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    }
    return {
        init: function(opts){

            this.container = (opts.container);

            this.render(opts);

        },
        render: function(opts){

            var _this = this;

            var fragment = document.createDocumentFragment(),
                div = document.createElement('div'),
                ul = document.createElement('ul');

            _this.options = opts;
            _this.imgContainer = ul;

            div.className = 'page-content';
            ul.className = 'm-cascadingTeletext';
            ul.style.height = window.innerHeight + 'px';

            opts.images.forEach(function(url){
                _this.createImgContainetComponent(url);
            });

            this.renderControlBtns(div);

            div.appendChild(ul);
            fragment.appendChild(div);

            this.container.appendChild(fragment);

            this.container.classList.add('mag-current');

            _this.swipeParam = 0;
            _this.swipeStart = { x: 0, y: 0 };
            _this.swipeEnd = { x: 0, y: 0 };

            _this.imgContainer.addEventListener('touchstart', function(e){
//                e.preventDefault();
//                e.stopPropagation();

                e.touches ||  e.originalEvent ? e = e.touches[0] : null;
                _this.swipeStart.x = e.pageX || e.clientX;
                _this.swipeStart.y = e.pageY || e.clientY;

            });

            _this.imgContainer.addEventListener('touchmove', function(e){

                var event = e;

                _this.swipeParam++;
                e.touches ||  e.originalEvent ? e = e.touches[0] : null;
                _this.swipeEnd.x = e.pageX || e.clientX;
                _this.swipeEnd.y = e.pageY || e.clientY;

                if ( _this.swipeParam >= Math.abs(_this.swipeStart.y -_this.swipeEnd.y)/16 ) {
                    event.preventDefault();
                    event.stopPropagation();

                } else {
                    // here will be some code
                }

            });
            _this.imgContainer.addEventListener('touchend', function(e){

                e.touches ||  e.originalEvent ? e = e.touches[0] : null;


                if ( _this.swipeEnd.x == 0 ) _this.swipeEnd.x = _this.swipeStart.x;

                _this.swipeParam = Math.abs(_this.swipeStart.x - _this.swipeEnd.x);

                if ( _this.swipeParam > window.innerWidth/10 && _this.swipeEnd.x < _this.swipeStart.x) {
                    _this.swipeNext(_this);

                }
                if ( _this.swipeParam > window.innerWidth/10 && _this.swipeEnd.x > _this.swipeStart.x) {
                    _this.swipePrev(_this);
                }
                _this.swipeParam = 0;
                _this.swipeEnd.x = 0
            });
        },
        renderControlBtns: function(elem){
            var _this = this,
                prevDiv = document.createElement('div'),
                nextDiv = document.createElement('div'),
                prevDivTouchArea = document.createElement('div'),
                nextDivTouchArea = document.createElement('div');

            prevDiv.className = 'u-guidePrev z-move';
            nextDiv.className = 'u-guideNext z-move';

            prevDiv.appendChild(prevDivTouchArea);
            nextDiv.appendChild(nextDivTouchArea);

            elem.appendChild(prevDiv);
            elem.appendChild(nextDiv);

            prevDivTouchArea.addEventListener('touchend', function(e){
                _this.swipePrev(_this);
            });
            nextDivTouchArea.addEventListener('touchend', function(e){
                _this.swipeNext(_this);
            });
        },
        swipePrev: function(_this){
            _this.imgContainer.children[_this.imgContainer.children.length - 1].swipePrev();
        },
        swipeNext: function(_this){
            _this.imgContainer.children[0].swipeNext();
        },
        createImgContainetComponent: function(url){

            var _this = this,
                li = document.createElement('li'),
                img = document.createElement('img');

            img.setAttribute('src', url);

            li.swipeNext = function(){
                var _li = this;
                _li.classList.add('z-hideToLeft');

                setTimeout(function(){
                    setTimeout(function(){
                        _li.classList.remove('z-hideToLeft');
                    },0)
                    setTimeout(function(){
                        _this.imgContainer.appendChild(_this.imgContainer.children[0]);
                    },1)
                }, 300);
            };
            li.swipePrev = function(){
                var _li = this;
                _this.imgContainer.insertBefore(_this.imgContainer.children[_this.imgContainer.children.length - 1], _this.imgContainer.children[0]);

                _li.classList.add('z-hideToRight');
                setTimeout(function(){
                    _li.classList.remove('z-hideToRight');
                }, 900);
            };

            li.appendChild(img);
            this.imgContainer.appendChild(li);
        }
    }
}

