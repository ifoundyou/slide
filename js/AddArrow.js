
function AddArrow() {
    function css(elem,css){
        for (var j in css) {
            elem.style[j] = css[j];
        }
    }

    return {
        init: function (opts) {

            var _this = this;

            this.render(opts);

            document.addEventListener('touchmove', function() {

                _this.onTouchstart(_this);
            });
            document.addEventListener('touchend', function() {
                _this.onTouchend(_this);
            });

            document.addEventListener('hideElementsEvent', function(){
                _this.onTouchstart(_this);
            });
            document.addEventListener('showElementsEvent', function() {
                _this.onTouchend(_this);
            });
        },

        render: function (opts) {
            var container = document.createElement(opts.elemName),
                img = document.createElement(opts.imageTagName);

            container.className = opts.elemClassName;
            img.style.backgroundImage = opts.arrowImgSrc;
            container.appendChild(img);
            css(container, opts.elemStyle);
            css(img, opts.imageStyle);
            opts.container ? opts.container.appendChild(container) : document.body.appendChild(container);
            this.container = container;



        },

        onTouchstart: function(_this) {
            _this.container.style.display = 'none';
        },

        onTouchend: function(_this) {
            _this.container.style.display = 'block';
        }

    }
}
