function PageCounter(){
    return {
        opts: {},
        slides: [],
        init: function(opts) {
            this.render(opts);
        },
        render: function(opts){
            var progress_wrapper = document.createElement('div'),
                div = document.createElement('div'),
                page_quantity_span = document.createElement('span'),
                page_conter_span = document.createElement('span'),
                slides = document.querySelectorAll(opts.slide);

            this.opts = opts;
            progress_wrapper.className = 'page-number-counter-wrapper';
            div.className = 'page-number-counter';
            progress_wrapper.appendChild(div);

            opts.container ?
            opts.container.insertBefore(progress_wrapper, (opts.container).firstChild) :
            document.body.appendChild(progress_wrapper);

            this.page_quantity_span = page_quantity_span;
            this.page_conter_span = page_conter_span;
            this.progressLine = div;

            div.appendChild(page_conter_span);
            div.appendChild(page_quantity_span);

            for ( var i = 0; i < ( slides.length ); i++ ) {
                this.slides.push(slides[i]);
            }

            this.pageNumber(opts);
        },
        pageNumber: function(opts){
            var currnetSlide = document.querySelector(this.opts.activeSlide),
                current = 0;
            for ( var i = 0; i < ( this.slides.length ); i++ ) {
                if ( this.slides[i] === currnetSlide ) {
                    current = i+1;
                    this.page_conter_span.innerHTML = current + ' / ';
                    this.page_quantity_span.innerHTML = this.slides.length ;
                }
            }
        }
    }
}