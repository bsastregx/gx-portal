<script>
        let accordion = document.querySelector('.accordion');
        let accordionItems = accordion.querySelectorAll('.accordion__item');

        Array.from(accordionItems).forEach(accordionItem => {
            let button = accordionItem.querySelector('.accordion__button');
            let collapse = accordionItem.querySelector('.accordion__collapse');
            let body = accordionItem.querySelector('.accordion__body');
            //set initial height for the active accordion
            if(accordionItem.classList.contains('accordion__item--active')){
                collapse.style.height = body.offsetHeight + 'px';
            }
            button.addEventListener('click', function(){

                //Close previous active accordion, if any.
                let activeItem = accordion.querySelector('.accordion__item--active');
                if(activeItem) {
                    let activeItemButton = activeItem.querySelector('.accordion__button');
                    if(activeItemButton !== this) {
                        activeItem.classList.remove('accordion__item--active');
                        activeItem.querySelector('.accordion__collapse').style.height = '0px';
                    }
                }

                if(accordionItem.classList.contains('accordion__item--active')) {
                    collapse.style.height = '0px';
                    accordionItem.classList.remove('accordion__item--active');
                } else {
                    collapse.style.height = body.offsetHeight + 'px';
                    accordionItem.classList.add('accordion__item--active');
                }
            })
        });

        //Close active accordion if any, on resize.
        let prevWidth = document.body.clientWidth;
        const myObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const width = entry.borderBoxSize?.[0].inlineSize;
                if (typeof width === 'number' && width !== prevWidth) {
                    prevWidth = width;
                    let activeItem = accordion.querySelector('.accordion__item--active');
                    if(activeItem) {
                        activeItem.classList.remove('accordion__item--active');
                        activeItem.querySelector('.accordion__collapse').style.height = '0px';
                    }
                }

            });
        });
        const body = document.querySelector('body');
        myObserver.observe(body);
    </script>