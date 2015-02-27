
function AddVideo() {
    function css(elem,css){
        for (var j in css) {
            elem.style[j] = css[j];
        }
    }

    return {
        init: function (opts) {

            var _this = this;
            this.render(opts);

            document.addEventListener('videoStop', function() {
                _this.videoStop();
            });
        },

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

            var container = document.querySelector(opts.container);

            var video = document.createElement('video'),
                div = document.createElement('div');

            this.video = video;
            div.className = opts.elemName;

            for ( var prop in opts.videoAttr ) {
                video.setAttribute( prop, opts.videoAttr[prop]);
            }

            for (var i = 0; i < opts.sources.length; i++) {
                var source = document.createElement('source');
                source.setAttribute('src', opts.sources[i].src);
                source.setAttribute('type', opts.sources[i].type);
                video.appendChild(source);
            }

            css(div, opts.style);

            var videoEvent = document.createEvent('Event');
            videoEvent.initEvent('videoEvent');

            video.addEventListener('touchend', function(){
                video.play();
            });

            video.addEventListener('play', function(e){

                var mediaElements = document.querySelectorAll('audio, video');

                for (var i = 0; i < mediaElements.length; i++ ) {
                    if ( video == mediaElements[i] ) continue;

                    mediaElements[i].dispatchEvent(videoEvent);
                }
                video.play();

            });

            div.appendChild(video);
            container.appendChild(div);


            div.style.position = 'absolute';
            video.style.position = 'absolute';
            video.style.zIndex = 1000;
            div.style.webkitTransform = 'translate3d(0px, 0px, 0px)';

        },

        videoStop: function (e) {
            this.video.pause();
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
