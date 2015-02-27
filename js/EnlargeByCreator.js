function EnlargeByCreator() {
    return {
        init: function(opts) {
            var _this = this;
            _this.opts = opts;
            _this.elem = opts.container.querySelector(opts.elem);

            document.addEventListener('slideChangeStart', function(){
                _this.enlargeCancel();
            });
            document.addEventListener('slideChanged', function(){
                _this.enlarge();
            })
        },
        enlarge: function(){
            var _this = this;
            var params = _this.elem.getBoundingClientRect();
            if ( _this.elem.classList.contains('enlarged') ) return;
            _this.elem.classList.add('enlarged');
            _this.elem.style.webkitTransform = 'scale('+_this.opts.imgScale
                + ') translate('
                + (0.5-_this.opts.pointX)
                * (params.width*_this.opts.imgScale - window.innerWidth)
                / _this.opts.imgScale
                + 'px, '
                + (0.5-_this.opts.pointY)
                * ( params.height*_this.opts.imgScale - window.innerHeight)
                / _this.opts.imgScale
                + 'px)';
            _this.elem.style.webkitTransition = 'all '+_this.opts.duration+'s '+_this.opts.effect;
        },
        enlargeCancel: function() {
            var _this = this;

            this.elem.classList.remove('enlarged');
            this.elem.style.webkitTransition = 'all 0s ease';
            this.elem.style.webkitTransform = 'scale(1) translate(0,0)';
        }
    }
}