let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
let tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
let desktop = window.matchMedia('(min-width: 1025px)');

function truncateText(dots, truncatedText, readMore) {
    dots.style.display = 'inline';
    truncatedText.style.display = 'none';
    readMore.textContent = 'еще';
}

function showText(dots, truncatedText, readMore) {
    dots.style.display = 'none';
    truncatedText.style.display = 'inline';
    readMore.textContent = 'скрыть';
}

function initSwiperMobile(swiperInstance, swiperSelector, swiperParams) {
    if (mobile.matches && !swiperInstance) {
        swiperInstance = new Swiper(swiperSelector, swiperParams);
    } else if (tablet.matches && swiperInstance) {
        swiperInstance.destroy();
        swiperInstance = null;
    } else if (desktop.matches && swiperInstance) {
        swiperInstance.destroy();
        swiperInstance = null;
    }

    return swiperInstance;
}

jQuery(function () {
    const homePromoSlider = new Swiper('.promo-section .swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });

    const specialistsSlider = new Swiper('.specialists-slider .swiper', {
        loop: false,
        slidesPerView: 1.3,
        spaceBetween: 8,
        breakpoints: {
            400: {
                slidesPerView: 1.3,
                spaceBetween: 8,
            },
            700: {
                slidesPerView: 2.5,
                spaceBetween: 10,
            },
            1000: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 4.5,
                spaceBetween: 10,
            },
            1320: {
                slidesPerView: 5.5,
                spaceBetween: 10,
            }
        }
    });

    let homeBlogSliderParams = {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 8,
        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 8,
            }
        }
    };

    let homeBlogSlider = null;
    let exitHomeBlogSlider = Boolean($('section.blog .swiper').length);
    homeBlogSlider = new Swiper('section.blog .swiper', homeBlogSliderParams);
    if (exitHomeBlogSlider) {
        homeBlogSlider = initSwiperMobile(homeBlogSlider, 'section.blog .swiper', homeBlogSliderParams);
    }

    $(window).resize(function() {
        if (exitHomeBlogSlider) {
            homeBlogSlider = initSwiperMobile(homeBlogSlider, 'section.blog .swiper', homeBlogSliderParams);
        }
    });

    let homeServicesSliderParams = {
        loop: false,
        slidesPerView: 1.1,
        spaceBetween: 8,
        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 8,
            }
        }
    };

    let homeServicesSlider = null;
    let exitHomeServicesSlider = Boolean($('section.our-services .swiper').length);
    if (exitHomeServicesSlider) {
        homeServicesSlider = initSwiperMobile(homeServicesSlider, 'section.our-services .swiper', homeServicesSliderParams);
    }

    $(window).resize(function() {
        if (exitHomeServicesSlider) {
            homeServicesSlider = initSwiperMobile(homeServicesSlider, 'section.our-services .swiper', homeServicesSliderParams);
        }
    });

    // reviews
    $('.reviews__item .reviews__item-text').shave(200);

    $('.reviews__item .reviews__item-more').click(function () {
        const parent = $(this).parents('.reviews__item');
        const dots = $(parent).find('.js-shave-char');
        const truncatedText = $(parent).find('.js-shave');

        if (truncatedText[0].style.display === 'inline') {
            truncateText(dots[0], truncatedText[0], $(this)[0]);
        } else {
            showText(dots[0], truncatedText[0], $(this)[0]);
        }
    });


    // burger
    let burgerMenu = $('.burger-menu');

    $('header.header .burger, .burger-menu .burger-menu__close').click(function () {
        if (burgerMenu.length) {
            burgerMenu.stop().animate({
                width: "toggle"
            }, 200);
            $('body').toggleClass('body__burger-menu-open');
        }
    });


    // doctors
    let doctorsSliderElement = $('.doctor__cards .swiper');
    const doctorsSlider = new Swiper('.doctor__cards .swiper', {
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        paginationType: "custom",
        pagination: {
            el: '.doctor__cards-pagination',
            clickable: true,
            renderBullet: function (currentIndex, className) {
                let images = [];
                doctorsSliderElement.find('.swiper-slide').each(function() {
                    images.push($(this).data('pagination-src'));
                });

                return '<div class="doctor__cards-pagination__item ' +  className  +  '"><img class="doctor__cards-pagination__item-img" src="' + images[currentIndex] + '" width="100%" /></div>';
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    Fancybox.bind('[data-fancybox="gallery"]');

    $('.question-answer .question-answer__list-item-question').click(function () {
        let parent = $(this).parents('.question-answer__list-item');
        if (parent.length) {
            let item = parent.find('.question-answer__list-item-answer');
            if (item) {
                $(item).slideToggle(200);
                $(parent).toggleClass('question-answer__list-item_active');
            }
        }
    })

});
