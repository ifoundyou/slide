var Enlarge = function() {

    var startX, startY, xCoord, yCoord, xCoordStart, yCoordStart, xCoordEnd, yCoordEnd;

    return {
        opts: {},
        touchImgParam: false,               // detect image enlarged or not
        swipeImgParam: false,               // detect swiping under image
        enlargeParametr: false,             // block events during enlarge animation
        init: function(opts) {
            var _this = this;

            this.opts = opts;

            _this.elem = opts.container.querySelector(opts.elem);

            _this.elem.addEventListener('touchstart', function(e){
                e.touches ||  e.originalEvent ? e = e.touches[0] : null;

                if (_this.touchImgParam) {
                    startX = e.pageX;
                    startY = e.pageY;
                } else {
                    _this.opts.pointX = (e.pageX) / window.innerWidth;
                    _this.opts.pointY = (e.pageY) / window.innerHeight;

                }
            });
            var mylatesttap;

            _this.elem.addEventListener('touchend', function(){

                if ( _this.enlargeParametr ) return;

                if ( _this.elem.classList.contains('enlarged') ) {
                    if ( _this.swipeImgParam ) {
                        _this.swipeImgParam = false;
                        return;
                    }
                    _this.enlargeCancel();
                } else {

                    var now = new Date().getTime();
                    var timesince = now - mylatesttap;

                    if((timesince < 600) && (timesince > 0)){
                        _this.enlarge()
                    }
                    mylatesttap = new Date().getTime();
                }
            });
            _this.elem.addEventListener('touchmove', function(e){
                if (!_this.touchImgParam || _this.enlargeParametr ) return;

                e.preventDefault();
                e.stopPropagation();
                _this.swipeImgParam = true;

                e.touches ||  e.originalEvent ? e = e.touches[0] : null;

                var currentX = e.pageX,
                    currentY = e.pageY;
                _this.elem.style.webkitTransition = 'all 0s linear';
                _this.elem.style.transition = 'all 0s linear';
                if ( !startX ) startX = currentX;
                xCoord +=  (currentX-startX) / _this.opts.imgScale;
                if ( !startY ) startY = currentY;
                yCoord +=  (currentY-startY) / _this.opts.imgScale;
                if ( xCoord < xCoordStart) xCoord = xCoordStart;
                if ( xCoord > xCoordEnd) xCoord = xCoordEnd;
                if ( yCoord < yCoordStart) yCoord = yCoordStart;
                if ( yCoord > yCoordEnd) yCoord = yCoordEnd;

                _this.elem.style.webkitTransform = 'scale('+_this.opts.imgScale
                    + ') translate3d(' + xCoord + 'px, ' + yCoord + 'px,0)';

                _this.elem.style.webkitTransition = 'all 0s linear';
                _this.elem.style.transition = 'all 0s linear';

                startX = currentX;
                startY = currentY;
            });

        },
        enlarge: function(){

            var _this = this;
            _this.touchImgParam = true;

            var params = _this.elem.getBoundingClientRect();

            if ( _this.elem.classList.contains('enlarged')
                || !(_this.opts.container).classList.contains('active')) return;

            _this.elem.classList.add('enlarged');

            xCoord = (0.5-_this.opts.pointX) * (params.width*_this.opts.imgScale - window.innerWidth);
            xCoordStart = (-0.5) * (params.width*_this.opts.imgScale - window.innerWidth) / _this.opts.imgScale;
            xCoordEnd = (0.5) * (params.width *_this.opts.imgScale - window.innerWidth) / _this.opts.imgScale;

            yCoord = (0.5-_this.opts.pointY) * ( params.height*_this.opts.imgScale - window.innerHeight);
            yCoordStart = (-0.5) * ( params.height*_this.opts.imgScale - window.innerHeight) / _this.opts.imgScale;
            yCoordEnd = (0.5) * ( params.height*_this.opts.imgScale - window.innerHeight) / _this.opts.imgScale;

            if ( xCoord < xCoordStart) xCoord = xCoordStart;
            if ( xCoord > xCoordEnd) xCoord = xCoordEnd;
            if ( yCoord < yCoordStart) yCoord = yCoordStart;
            if ( yCoord > yCoordEnd) yCoord = yCoordEnd;

            _this.elem.style.webkitTransform = 'scale('
                + this.opts.imgScale
                + ') translate3d(' + xCoord + 'px, ' + yCoord + 'px,0)';

            _this.elem.style.webkitTransition = 'all '+this.opts.duration+'s '+this.opts.effect;

            _this.blocker();

        },
        enlargeCancel: function() {
            if (!this.elem) return;

            this.touchImgParam = false;
            this.elem.classList.remove('enlarged');
            this.elem.style.webkitTransition = 'all '+this.opts.duration+'s linear';
            this.elem.style.transition = 'all '+this.opts.duration+'s linear';
            this.elem.style.webkitTransform = 'scale(1) translate3d(0,0,0)';
            this.blocker();
        },
        blocker: function() {
            var _this = this;
            _this.enlargeParametr = true;
            setTimeout(function(){
                _this.enlargeParametr = false;
            }, this.opts.duration * 1000);
        }
    }
};
