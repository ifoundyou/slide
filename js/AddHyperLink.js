
function AddHyperLink() {

    function css(elem,css){
        for (var j in css) {
            if ( j == 'width' ) {
                elem.style[j] = css[j]*window.innerWidth/960 + 'px';
            } else {
                elem.style[j] = css[j];
            }
        }
    }

    function setAttributes(elem, attributes) {

        for ( var prop in attributes ) {
            if ( prop != 'target') {
                elem.setAttribute( prop, attributes[prop]);
            }
        }
    }

    return {
        init: function(opts) {
            this.render(opts);
        },

        render: function(opts) {
            var div = document.createElement('div'),
                wrapper_div = document.createElement('div'),
                a = document.createElement('a'),
                fragment = document.createDocumentFragment();

            wrapper_div.className = opts.linkWrapperClassName;

            setAttributes( a, opts.linkAttributes);

            a.innerHTML = opts.linkTitle;

            div.appendChild(a);
            fragment.appendChild(div);

            var container = opts.container;

            css( div, opts.style );
            wrapper_div.appendChild(div);

            document.body.appendChild(wrapper_div);

            wrapper_div.style.top = opts.top + 'px';
            div.style.left = opts.left + 'px';
            div.style.width = a.getBoundingClientRect().width + 'px';

            container.appendChild(wrapper_div);

            if (opts.linkAttributes.target) {
                a.addEventListener('touchend', function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    var win = window.open(opts.linkAttributes.href, opts.linkAttributes.target);
                    win.focus();
                })
            }
        }
    }
}
