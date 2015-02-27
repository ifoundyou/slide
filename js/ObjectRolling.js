function ObjectRolling(){
    return {
        init: function(opts) {
            this.render(opts);
        },
        render: function(opts){
            var wrapper = document.createElement('div'),
                div = document.createElement('div'),
                img = document.createElement('img'),
                imgPopup = document.createElement('img'),
                fragment = document.createDocumentFragment(),
                imageWrapper = document.createElement('div'),
                a = document.createElement('a');

            wrapper.className = 'm-link';
            imageWrapper.className = 'u-maskLayer m-weixinShareLayer hide';
            a.className = 'u-maskLayer-close';

            div.className = 'imgLink';
            img.setAttribute('src', opts.rollingImgSrc);
            imgPopup.setAttribute('src', opts.PopupImgSrc);

            imageWrapper.style.display = 'none';

            div.appendChild(img);
            imageWrapper.appendChild(imgPopup);
            imageWrapper.appendChild(a);

            wrapper.appendChild(div);
            fragment.appendChild(wrapper);

            fragment.appendChild(imageWrapper);

            var container = (opts.container);

            container.appendChild(fragment);

            img.addEventListener('touchend', function(){

                if ( imageWrapper.classList.contains('show') ) {
                    hide()
                    } else {
                    imageWrapper.style.display = 'block';
                    setTimeout(function(){
                        imageWrapper.classList.add('show');
                    }, 1)
                }

            })

            imageWrapper.addEventListener('touchend', hide );
            a.addEventListener('touchend', hide );

            function hide() {
                imageWrapper.classList.remove('show');
                setTimeout(function(){
                    imageWrapper.style.display = 'none';
                }, 600);
            }

        }
    }
}