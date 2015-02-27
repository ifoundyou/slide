function Smudge(opts) {

    var _this;

// ------------------ Delta ------------------

    function elastic(progress) {
        return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*1.5/3*progress)
    }

    function linear(progress) {
        return progress
    }

    function quad(progress) {
        return Math.pow(progress, 2)
    }

    function quint(progress) {
        return Math.pow(progress, 5)
    }

    function circ(progress) {
        return 1 - Math.sin(Math.acos(progress))
    }

    function back(progress) {
        return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5)
    }

    function bounce(progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    }

    function makeEaseInOut(delta) {
        return function(progress) {
            if (progress < .5)
                return delta(2*progress) / 2
            else
                return (2 - delta(2*(1-progress))) / 2
        }
    }

    function makeEaseOut(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    }
    return {
        imgData: [],
        canvas: {},
        context: {},
        trigger: true,
        cancelCombaining: false,
        param: 0,
        paint: false,
        paramTrigger: true,
        clickX: [],
        clickY: [],
        clickDrag: [],
        clickSize: [],
        curSize: "normal",

        init: function(opts) {
            _this = this;
            this.opts = opts;

            var hideElementsEvent =  document.createEvent('Event');
            hideElementsEvent.initEvent('hideElementsEvent');

            _this.hideElementsEvent = hideElementsEvent;

            var showElementsEvent =  document.createEvent('Event');
            showElementsEvent.initEvent('showElementsEvent');

            _this.showElementsEvent = showElementsEvent;

            this.render();
        },

        render: function() {

            var img = new Image();
            img.src = _this.opts.smudge_material_src;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            _this.canvas = canvas;
            _this.context = context;

            if ( _this.opts.container ){
                _this.container = _this.opts.container
            }  else {
                _this.container = document.body;
            }
            _this.container.appendChild(canvas);
            _this.setCanvasOptions( canvas );

            window.addEventListener('orientationchange', function() {
                if ( !_this.trigger ) {
                    return;
                }
                setTimeout(function(){
                    _this.container.removeChild(_this.canvas);
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    _this.canvas = canvas;
                    _this.context = context;
                    _this.container.appendChild(canvas);
                    _this.setCanvasOptions( canvas);
                    context.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height);
                },400)
            });

            img.addEventListener('load', function () {
                setTimeout(function () {
                    _this.context.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height);

                }, 400)
            });
            if ( _this.opts.container ) {
                _this.canvasEvent();
                document.addEventListener('sliderBuilt', _this.canvasEvent);
                document.addEventListener('slideChanged', _this.canvasEvent);
            }
            
        },

        setCanvasOptions: function ( canvas) {
                if ( window.orientation == 0 || window.orientation == 180 ) {
                    canvas.setAttribute('width', window.innerWidth);
                    canvas.setAttribute('height', window.innerHeight);

                } else {
                    canvas.setAttribute('width', window.innerHeight);
                    canvas.setAttribute('height', window.innerWidth);
                }

                canvas.style.position = 'absolute';
                canvas.style.left = '0px';
                canvas.style.top = '0px';
                canvas.style.zIndex = 100000;
                canvas.style.marginRight = '1px';
                canvas.addEventListener('touchstart', _this.canvasTouchstart);
                canvas.addEventListener('touchmove', _this.canvasTouchmove);
                canvas.addEventListener('touchend', _this.canvasTouchend);

        },

        canvasTouchstart: function (e) {
            e.preventDefault();
            e.stopPropagation();

            e.touches || e.originalEvent ? e = e.touches[0] : null;

            _this.canvas.style.position = 'fixed';

            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            _this.paint = true;

            if ( window.orientation == 0 || window.orientation == 180 ) {
                _this.addClick(e.pageX, e.pageY);
            } else {
                _this.addClick( e.pageY, window.innerWidth - e.pageX );
            }
            _this.redraw();

            _this.cancelCombaining = true;
        },

        canvasTouchmove: function (e) {
            e.preventDefault();
            e.stopPropagation();

            _this.canvas.style.position = 'fixed';

            _this.param++;
            if (_this.param) {
                e.touches || e.originalEvent ? e = e.touches[0] : null;

                if (_this.paint) {

                    if ( window.orientation == 0 || window.orientation == 180 ) {
                        _this.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                    } else {
                        _this.addClick(e.pageY - this.offsetTop,  window.innerWidth - e.pageX - this.offsetLeft, true);

                    }
                    _this.redraw();
                }
            }
        },

        canvasTouchend: function (e) {

            e.preventDefault();
            e.stopPropagation();

            if (!_this.paramTrigger) return;

            var alpha_0 = [];
            _this.param = 0;
            e.touches || e.originalEvent ? e = e.touches[0] : null;

            var data = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height).data;

            for (var i = 0, n = data.length; i < n; i += 4) {
                if (data[i + 3] == 0) {
                    alpha_0.push(data[i + 3])
                }
            }
            if (data.length / 4 * _this.opts.field_area < alpha_0.length) {
                _this.makeTransperent(); // start from hear
            }
            _this.paint = false;
            _this.cancelCombaining = false;
        },

        addClick: function (x, y, dragging) {

            _this.clickX.push(x);
            _this.clickY.push(y);
            _this.clickDrag.push(dragging);
            _this.clickSize.push(_this.curSize);
        },

        redraw: function () {

            for (var i = 0; i < 7; i++) {
                _this.context.beginPath();
                _this.context.globalCompositeOperation = 'destination-out';
                strokeStyle = "rgba(0,0,0,0)";
                _this.context.lineJoin = "round";
                _this.context.lineWidth = _this.opts.lineWidth;
                _this.context.arc(_this.clickX[_this.clickX.length - 1], _this.clickY[_this.clickY.length - 1], _this.context.lineWidth, 0, 2 * Math.PI, true);
                _this.context.fill();
                _this.context.closePath();
                _this.context.beginPath();
                _this.context.lineWidth = _this.context.lineWidth * 2;

                if (_this.clickDrag[i] && i && _this.cancelCombaining) {
                    _this.context.moveTo(_this.clickX[_this.clickX.length - 2], _this.clickY[_this.clickY.length - 2]);
                } else {
                    _this.context.moveTo(_this.clickX[_this.clickX.length - 1], _this.clickY[_this.clickY.length - 1]);
                }

                _this.context.lineTo(_this.clickX[_this.clickX.length - 1], _this.clickY[_this.clickY.length - 1]);
                _this.context.stroke();
                _this.context.lineWidth = _this.context.lineWidth / 2;
                _this.context.globalCompositeOperation = 'destination-over';
                _this.context.closePath();
            }
            _this.context.save();
        },

        canvasEvent: function () {
            if ( _this.canvas == '' || !_this.container.parentElement.classList.contains('active')) {
                document.dispatchEvent(_this.showElementsEvent);
                return;
            }
            if ( _this.canvas.getBoundingClientRect().left == 0 && _this.trigger) {

                setTimeout(function(){
                    document.dispatchEvent(_this.hideElementsEvent);
                }, 250)
            }
            if ( _this.canvas.getBoundingClientRect().top == 0 && _this.trigger) {

                setTimeout(function(){
                    document.dispatchEvent(_this.hideElementsEvent);
                }, 250)
            } else {
                document.dispatchEvent(_this.showElementsEvent);
            }
        },

        makeTransperent: function () {

            _this.paramTrigger = false;
            _this.animate({
                delay: 10,
                duration: _this.opts.duration,
                delta: quad(bounce),
                step: function (delta) {
                    _this.canvas.style.opacity = 1 - delta;
                    if (delta == 1) {

                        if ( _this.opts.container ) {
                            document.dispatchEvent(_this.showElementsEvent);
                        }
                        _this.canvas.style.display = 'none';
                        _this.trigger = false;
                        _this.clickX = [];
                        _this.clickY = [];
                        _this.clickDrag = [];
                        _this.clickSize = [];
                    }
                }
            });
        },

        animate: function (opts) {

            var start = new Date;
            var delta = opts.delta || linear;

            var timer = setInterval(function () {
                var progress = (new Date - start) / opts.duration;
                if (progress > 1) progress = 1;
                opts.step(delta(progress));
                if (progress == 1) {
                    clearInterval(timer);
                    opts.complete && opts.complete();
                }
            }, opts.delay || 13);

            return timer;
        }
    }
}


