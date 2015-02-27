function TurnAroundEffect() {

    return {
        init: function(opts) {
            this.render(opts);
        },
        param:  0,
        mouse: {
            start: 0,
            end: 0
        },
        render: function(opts) {
            var _this = this,
                url_data = opts.url_data,
                container = (opts.container),
                img_container = document.createElement('div');

            img_container.className = 'imgbox';

            url_data.forEach(function(url,i) {
                var img = new Image();
                img.src = url;
                if ( i == 0 ) {
                    img.style.display = 'inline';
                } else {
                    img.style.display = 'none';
                }

                img_container.appendChild(img);
            });

            container.appendChild(img_container);

            container.addEventListener('touchstart', function(evt) {
                evt.preventDefault();

                delete _this.mouse.last;

                evt.touches ||  evt.originalEvent ? evt = evt.touches[0] : null;

                _this.mouse.start = evt.pageX;

                container.addEventListener('touchmove', function(e){
                    _this.onMouseMove(e, _this);
                });
            });

            container.addEventListener('touchend', function () {
                container.removeEventListener('touchmove', function(e){
                    _this.onMouseMove(e, _this);
                });
            });
        },
        onMouseMove: function (event, _this) {

            event.preventDefault();
            event.touches ||  event.originalEvent ? event = event.touches[0] : null;

            var array = document.querySelectorAll('.imgbox img');
            if ( _this.param >= 6 ) {
                _this.param = 0;

                for ( var i = 0; i < array.length; i++ ) {

                    if (  array[i].style.display == 'inline' ) {
                        array[i].style.display = 'none';
                        if (array[i + 1]) {
                            array[i + 1].style.display = 'inline';
                            break;
                        } else {
                            array[0].style.display = 'inline';
                            break;
                        }
                    }
                }
            } else if ( _this.param <= -6 ) {
                _this.param = 0;

                for ( var i = 0; i < array.length; i++ ) {

                    if (  array[i].style.display == 'inline' ) {
                        array[i].style.display = 'none';
                        if (array[i - 1]) {
                            array[i - 1].style.display = 'inline';
                            break;
                        } else {
                            array[array.length - 1].style.display = 'inline';
                            break;
                        }
                    }
                }
            } else {
                _this.param += _this.mouse.start - event.pageX;
            }
            _this.mouse.start = event.pageX;
        }
    }
}
