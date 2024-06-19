import Swiper from 'swiper';
import  { Navigation, Mousewheel, Autoplay, Pagination }  from 'swiper/modules';
Swiper.use([Navigation, Mousewheel, Autoplay, Pagination]);


$(document).ready(function(){


    ////
    let productSliderSelector = '.js-products-slider';
    if (document.querySelectorAll(productSliderSelector).length ) {
        const swiperProduct = new Swiper(productSliderSelector, {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    pagination: false,
                    navigation: {
                        nextEl: '.h-reviews__nav--next',
                        prevEl: '.h-reviews__nav--prev',
                    },
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            },

            loop: false,
        })
    }


    if (document.querySelectorAll(".js-articles-slider").length ) {
        const swiperArticles = new Swiper('.js-articles-slider', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.p-page__articles__next',
                prevEl: '.p-page__articles__prev',
            },

            breakpoints: {
                992: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                }
            },

            //loop: true,
        })
    }


    if (document.querySelectorAll(".m-schema__swiper").length ) {
        const swiperSchema = new Swiper('.m-schema__swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.m-schema__swiper__next',
                prevEl: '.m-schema__swiper__prev',
            },

            pagination: {
                el: ".m-schema__pagination",
                clickable: true,
            },
            //loop: true,
        })

        $(document).on('click', '.js-schema-tab', function (e){
            e.preventDefault();;

            swiperSchema.slideTo($(this).data('index'))

        })

        swiperSchema.on('slideChange', function (swiper){
            $('.js-schema-tab').removeClass('active')
            $('.js-schema-tab[data-index="'+swiper.activeIndex+'"]').addClass('active')
            let $active = $('.js-schema-tab[data-index="'+swiper.activeIndex+'"]');
            console.log($active);
            console.log($active.position().left);
            $('.m-schema__tabs')[0].scrollLeft = $active[0].offsetLeft
            //$('.m-schema__tabs').animate({scrollLeft: $active.position().left}, 500);
        });
    }
});