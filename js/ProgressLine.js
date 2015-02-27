function Progressline(){
    var _this;
    return {
        opts: {},
        slides: [],
        init: function(opts) {
            _this = this;
            this.render(opts);
        },
        render: function(opts){
            var progressWrapper = document.createElement('div'),
                div = document.createElement('div'),
                slides = document.querySelectorAll(opts.slide);

            this.opts = opts;
            div.className = 'progress-line';
            progressWrapper.appendChild(div);
            document.body.appendChild(progressWrapper);
            this.progressLine = div;

            for ( var i = 0; i < ( slides.length ); i++ ) {
                this.slides.push(slides[i]);
            }

            this.progressWidth(opts);
            window.addEventListener('orientationchange', function() {
                _this.progressWidth(opts);
            });
        },
        progressWidth: function(opts){

            var currnetSlide = document.querySelector(this.opts.activeSlide),
                current = 0;

            for ( var i = 0; i < ( this.slides.length ); i++ ) {

                if ( this.slides[i] === currnetSlide ) {

                    current = i+1;

                    if ( window.orientation == 0 || window.orientation == 180) {
                        this.progressLine.style.width = current / ( this.slides.length  ) * 100 +'%';
                        this.progressLine.style.height = '2px';
                    } else {
                        this.progressLine.style.height = current / ( this.slides.length  ) * 100 +'%';
                        this.progressLine.style.width = '2px';
                    }

                }
            }

        }
    }
}