var audio_buttons = {
    audioIcon: {
        imageSrc: './img/units-icons.png',
            className: 'audio-button'
    },
    playButtonUrl: './img/play_button_icon.png',
    silentInnerClassName: 'silence-html',
    silentInnerHTML: 'Tap button to play music or ',
    silenceButtonClassName:'silence-button',
    silenceButtonHTML:'silence',
    container: '.sw-container'
    };

var AddAudio  = {

        touchTarget : '',
        audioParam: false,
        globalAudio: '',
        currentAudio: '',
        rendered: false,
        hide_tlements_param: false,
        render: function (opts) {
            var _this = this;

            if ( this.rendered ) return;
            this.rendered = true;

            _this.drawAudioButton(audio_buttons, _this);

            document.addEventListener('hideElementsEvent', function(e){
                _this.hide_tlements_param = true;
                _this.audioCurrentCheck( _this)

            });
            document.addEventListener('showElementsEvent', function(e) {
                _this.hide_tlements_param = false;
                _this.audioCurrentCheck( _this)
            });

        },

        initGlobal: function(opts) {
            this.globalAudio = this.init(opts);
            this.drawSecurityScreen(audio_buttons);

        },
        init: function(opts) {

            var _this = this;
            var audio = document.createElement('audio'),
                div = document.createElement('div');

            for (var i = 0; i < opts.sources.length; i++) {
                var source = document.createElement('source');
                source.setAttribute('src', opts.sources[i].src);
                source.setAttribute('type', opts.sources[i].type);
                audio.appendChild(source);
            }

            audio.autobuffer = true;
            audio.load();

            div.appendChild(audio);

            var touchEndEvent = document.createEvent('Event');
            touchEndEvent.initEvent('touchend');

            audio.addEventListener('videoEvent', function () {
                if (_this.audioParam) {
                    _this.tapArea.dispatchEvent(touchEndEvent);
                }
            });

            opts.container.appendChild(div);

            var elems = document.querySelectorAll('.image-wrapper');

            for ( var j = 0; j < elems.length; j++ ) {
                (function (j) {
                    elems[j].removeEventListener('currentSlideChanged', checkSlide );
                    elems[j].addEventListener('currentSlideChanged', checkSlide );
                })(j);
            }

            function checkSlide (e) {
                _this.touchTarget = this;
                _this.audioCurrentCheck( _this)
            }

            this.render(opts);

            _this.touchTarget = document.querySelector('.active.slide-active-animation .image-wrapper');
            _this.audioCurrentCheck( _this);

            return audio;
        },

        drawSecurityScreen: function(opts) {
            var _this = this,
                container = document.querySelector(opts.container);

            var screen = document.createElement('div');

            screen.classList.add('screen-music-security');

            var img = document.createElement('div'),
                p = document.createElement('div'),
                span1 = document.createElement('span'),
                span2 = document.createElement('span'),
                fragment = document.createDocumentFragment();

            img.style.background = 'url('+opts.playButtonUrl+')';
            img.style.backgroundSize = 'contain';

            span1.innerHTML = opts.silentInnerHTML;
            span2.innerHTML = opts.silenceButtonHTML;

            span1.className = opts.silentInnerClassName;
            span2.className = opts.silenceButtonClassName;

            img.style.position = 'absolute';

            img.style.left = '50%';
            img.style.top = '50%';
            screen.style.opacity = '0';

            function setPosition () {
                if ( window.orientation == 0 || window.orientation == 180 ) {
                    screen.style.width = document.body.getBoundingClientRect().width + 'px';
                    screen.style.height = document.body.getBoundingClientRect().height + 'px';

                    screen.style.webkitTransform = 'rotate(0deg)';
                    screen.style.webkitTransformOrigin = '0% 0%';
                    screen.style.left = '0%';

                    img.style.width  = document.body.getBoundingClientRect().width/2 + 'px';
                    img.style.height = document.body.getBoundingClientRect().width/2 + 'px';

                    img.style.marginLeft = - document.body.getBoundingClientRect().width/4 +'px';
                    img.style.marginTop = - document.body.getBoundingClientRect().width/4 +'px';
                    p.style.top = img.getBoundingClientRect().bottom+'px';

                } else {

                    screen.style.width = document.body.getBoundingClientRect().height + 'px';
                    screen.style.height = document.body.getBoundingClientRect().width + 'px';
                    screen.style.webkitTransform = 'rotate(90deg)';
                    screen.style.webkitTransformOrigin = '0% 0%';
                    screen.style.left = '100%';

                    img.style.width  = document.body.getBoundingClientRect().height/2 + 'px';
                    img.style.height = document.body.getBoundingClientRect().height/2 + 'px';

                    img.style.marginLeft = - document.body.getBoundingClientRect().height/4 +'px';
                    img.style.marginTop = - document.body.getBoundingClientRect().height/4 +'px';
                    p.style.top = img.getBoundingClientRect().right+'px';

                }
                screen.style.opacity = '1';
            }

            p.appendChild(span1);
            p.appendChild(span2);

            screen.appendChild(img);
            screen.appendChild(p);
            fragment.appendChild(screen);
            document.body.appendChild(fragment);

            setTimeout(function(){
                setPosition();
            }, 400);

            p.style.position = 'relative';

            window.addEventListener('orientationchange', function() {
                setTimeout(function(){
                    setPosition();
                }, 400);
            });

            screen.addEventListener('touchmove',function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            img.addEventListener('touchend',function(e) {
                e.preventDefault();
                e.stopPropagation();

                document.body.removeChild(screen);

                _this.audioParam = true;
                _this.touchTarget = document.querySelector('.active.slide-active-animation .image-wrapper');
                _this.audioCurrentCheck( _this)

            });
            span2.addEventListener('touchend',function(e) {
                e.preventDefault();
                e.stopPropagation();
                document.body.removeChild(screen);
                _this.audioParam = false;
                _this.audioCurrentCheck( _this)

            })
        },
        audioButtonPosition: function ( div ) {
            if ( window.orientation == 0 || window.orientation == 180 ) {
                div.style.webkitTransform = 'rotate(0deg)';
                div.style.left = '';
                div.style.right = '15px';
                div.style.bottom = '150px';
            } else {
                div.style.webkitTransform = 'rotate(90deg)';
                div.style.left = '150px';
                div.style.right = '';
                div.style.bottom = '15px';
            }
        },
        drawAudioButton: function(opts, _this) {

            var div = document.createElement('div'),
                tapArea = document.createElement('div'),
                span = document.createElement('span'),
                i = document.createElement('i'),
                _this = this;

            i.className = 'icon-music';
            div.className = opts.audioIcon.className;
            div.style.webkitTransformOrigin = '50% 50%';

            _this.audioButtonPosition( div );

            window.addEventListener('orientationchange', function() {
                setTimeout( function () {
                    _this.audioButtonPosition( div );
                }, 400)

            });

            i.appendChild(tapArea);
            div.appendChild(i);
            div.appendChild(span);

            if ( _this.currentAudio ) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }

            _this.musicButton = i;
            _this.musicState = span;
            _this.musicControls = div;
            _this.tapArea = tapArea;

            opts.container ? document.querySelector(opts.container).appendChild(div) : document.body.appendChild(div);

            _this.notesAnimation = new _this.musicNotesAnimation(opts, _this);
            _this.tapArea.addEventListener('touchend', function(e){

                e.preventDefault();
                e.stopPropagation();
                if ( _this.audioParam ) {
                    _this.audioParam = false;
                    _this.audioCurrentCheck( _this);
                    _this.audioShow();
                } else {
                    _this.audioParam = true;
                    _this.audioCurrentCheck( _this);
                    _this.audioShow();
                }
            });
        },

        musicNotesAnimation: function(opts, _this){

            var defaults = {
                steams: ['<img src="./img/musicalNotes.png"/>',
                    '<img src="./img/musicalNotes.png"/>',
                    '<img src="./img/musicalNotes.png"/>',
                    '<img src="./img/musicalNotes.png"/>',
                    '<img src="./img/musicalNotes.png"/>',
                    '<img src="./img/musicalNotes.png"/>'],

                steamsFontFamily: ["Verdana", "Geneva", "Comic Sans MS", "MS Serif", "Lucida Sans Unicode", "Times New Roman", "Trebuchet MS", "Arial", "Courier New", "Georgia"],
                steamFlyTime: 3e3,
                steamInterval: 1000,
                steamMaxSize: 30,
                steamHeight: 100,
                steamWidth: 50
            };

            function drawMusicNote () {
                var b = randomizer(8, m.steamMaxSize),
                    c = e(1, m.steamsFontFamily),
                    d = "#" + e(6, "0123456789ABCDEF"),
                    h = randomizer(25, 50),
                    i = randomizer(-90, 89),
                    j = g(.4, 1),
                    l = "-webkit-transform";

                l = l + ":rotate(" + i + "deg) scale(" + j + ");";

                var p = document.createElement('span'),
                    q = randomizer(0, n - m.steamWidth - b);

                p.className = 'coffee-steam z-show';
                p.innerHTML =  e(1, m.steams);

                q > h && (q = randomizer(0, h)),
                    p.style.position = "absolute";
                p.style.left = h+'px';
                p.style.top = m.steamHeight + 'px';
                p.style.fontSize = b + "px";
                p.style.color = d;
                p.style.fontFamily = c;
                p.style.display = "block";
                p.style.opacity = 1;

                p.setAttribute("style", p.getAttribute("style") + l);

                o.appendChild(p);

                var param = randomizer(m.steamHeight , m.steamHeight/2);
                animate({
                    delay: 30,
                    duration: randomizer(m.steamFlyTime / 2, 1.2 * m.steamFlyTime),
                    delta: linear(),
                    step: function(delta) {

                        p.style.top = m.steamHeight - param * ( delta )+'px';
                        p.style.left = h + q * ( 1 - delta )+'px';
                        p.style.opacity = ( 1 - delta );

                        if ( delta == 1 ) {
                            p.parentNode.removeChild(p);
                            p = null;
                        }
                    }
                });
            }

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
            var h = null,
                j = null,
                bezier = "cubic-bezier(.09,.64,.16,.94)",
                l = this,
                m = defaults,
                n = m.steamWidth,
                o = document.createElement('div');

            o.className = "coffee-steam-box";
            o.style.height = m.steamHeight+'px';
            o.style. width = m.steamWidth+'px';
            o.style.left = 0+'px';
            o.style.top = -90+'px';
            o.style.position = "absolute";
            o.style.overflow = "hidden";
            o.style.zIndex = 0;

            _this.musicControls.appendChild(o);

            function animateContainer() {
                var a = randomizer(-10, 10);

                a += parseInt(o.style.left);

                a >= 10 ? a = 10 : -10 >= a && (a = -10);

                setInterval(function(){
                    o.style.left = a * ( 1 ) +'px';
                    o.style.webkitTransition = 'left '+randomizer(1e3, 3e3)/1000+'s '+bezier+' 0s';
                    o.style.transition = 'left '+randomizer(1e3, 3e3)/1000+'s '+bezier+' 0s';

                }, (randomizer(1e3, 3e3))*2)
            }

            function e(a, b) {
                a = a || 1;
                var c = "", d = b.length - 1, e = 0;
                for (i = 0; a > i; i++)e = randomizer(0, d - 1), c += b.slice(e, e + 1);
                return c
            }

            function randomizer(a, b) {
                var c = b - a, d = a + Math.round(Math.random() * c);
                return parseInt(d)
            }

            function g(a, b) {
                var c = b - a, d = a + Math.random() * c;
                return parseFloat(d)
            }

            return {
                stop : function () {
                    clearInterval(h);
                    clearInterval(j);
                    this.audioAnimation = true;
                },
                audioAnimation: true,
                start : function () {

                    if ( !this.audioAnimation ) return;

                    h = setInterval(function () {
                        drawMusicNote()
                    }, randomizer(m.steamInterval / 2, m.steamInterval));

                    j = setInterval(function () {

                    }, randomizer(100, 1e3) + randomizer(1e3, 3e3));
                    this.audioAnimation = false;

                }
            }

        },

        audioCurrentCheck: function(_this) {

            if ( _this.touchTarget && _this.touchTarget.querySelector('audio') ) {
                if ( _this.audioParam ) {
                    if (_this.currentAudio) {
                        _this.stopMedia();
                        _this.notesAnimation.stop();
                    }

                    _this.touchTarget.querySelector('audio').play();

                    _this.notesAnimation.start();

                    if ( _this.currentAudio ) _this.currentAudio.removeEventListener('play', _this.addPlayClass);
                    if ( _this.currentAudio ) _this.currentAudio.removeEventListener('pause', _this.removePlayClass);

                    _this.currentAudio = _this.touchTarget.querySelector('audio');

                    _this.currentAudio.addEventListener('play', _this.addPlayClass);
                    _this.currentAudio.addEventListener('pause', _this.removePlayClass);
                    _this.musicState.innerHTML = 'PLAY'

                } else {
                    if ( _this.currentAudio ) {
                        _this.currentAudio.pause();
                        _this.notesAnimation.stop();
                    }
                    _this.musicState.innerHTML = 'PAUSE';

                }
                if ( _this.hide_tlements_param ) {
                    _this.musicControls.style.display = 'none';
                } else {
                    _this.musicControls.style.display = 'block';
                }

            } else {
                if ( _this.audioParam ) {

                    if ( _this.globalAudio ) {
                        if ( _this.currentAudio != _this.globalAudio ) {
                            if ( _this.currentAudio ) {
                                if ( _this.hide_tlements_param ) _this.musicControls.style.display = 'none';
                                _this.currentAudio.pause();
                                _this.notesAnimation.stop();
                            }
                        }
                        _this.musicState.innerHTML = 'PLAY';
                        if ( _this.globalAudio ) {
                            _this.stopMedia();

                            _this.globalAudio.play();
                            _this.notesAnimation.start();
                            if (!_this.hide_tlements_param ) {
                                _this.musicControls.style.display = 'block';
                            } else {
                                _this.musicControls.style.display = 'none';
                            }

                        } else {
                            if ( _this.hide_tlements_param ) _this.musicControls.style.display = 'none';
                        }

                    } else {
                        _this.musicState.innerHTML = 'PAUSE';
                        if ( !_this.hide_tlements_param ) _this.musicControls.style.display = 'block';

                        if ( _this.currentAudio ) {
                            _this.currentAudio.pause();
                            _this.notesAnimation.stop();
                        } else {
                            if ( _this.hide_tlements_param ) _this.musicControls.style.display = 'none';

                        }
                        if ( !_this.globalAudio ) {
                            if ( _this.hide_tlements_param ) _this.musicControls.style.display = 'none';
                        }
                    }

                    _this.currentAudio = _this.globalAudio;

                    if ( _this.currentAudio ) _this.currentAudio.addEventListener('play', _this.addPlayClass);
                    if ( _this.currentAudio ) _this.currentAudio.addEventListener('pause', _this.removePlayClass);

                } else {
                    _this.musicState.innerHTML = 'PAUSE';
                    if (_this.currentAudio) {
                        _this.currentAudio.pause();
                        _this.notesAnimation.stop();
                        if ( !_this.hide_tlements_param ) _this.musicControls.style.display = 'block';
                    }
                    if ( _this.globalAudio ) {
                        if ( !_this.hide_tlements_param ) {
                            _this.musicControls.style.display = 'block';
                        } else {
                            _this.musicControls.style.display = 'none';
                        }
                    } else {
                        _this.musicControls.style.display = 'none';
                    }

                }
            }
        },
        stopMedia: function() {

            var _this = this;
            var mediaElements = document.querySelectorAll('audio, video');
            for (var i = 0; i < mediaElements.length; i++ ) {
                if ( _this.globalAudio != mediaElements[i] || _this.currentAudio != mediaElements[i]) {
                    mediaElements[i].pause();
                }
            }
        },

        addPlayClass: function(){

            document.querySelector('.icon-music').classList.add('play-music');
            document.querySelector('.icon-music').classList.remove('pause-music');
        },

        removePlayClass: function(){

            document.querySelector('.icon-music').classList.remove('play-music');
            document.querySelector('.icon-music').classList.add('pause-music');
        },

        audioShow: function(){

            var _this = this;
            _this.musicState.classList.add('audio-show');
            setTimeout(function(){
                _this.musicState.classList.remove('audio-show');
            }, 500)

        }
    };

