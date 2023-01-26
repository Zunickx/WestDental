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
    const homePromoSlider = new Swiper('.promo-section  .swiper', {
        loop: true,
    });

    const specialistsSlider = new Swiper('.specialists-slider .swiper', {
        loop: false,
        slidesPerView: 1.3,
        spaceBetween: 8,
        breakpoints: {
            500: {
                slidesPerView: 5.5,
                spaceBetween: 10,
            }
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
    homeServicesSlider = initSwiperMobile(homeServicesSlider, '.our-services .swiper', homeServicesSliderParams);

    $(window).resize(function() {
        homeServicesSlider = initSwiperMobile(homeServicesSlider, '.our-services .swiper', homeServicesSliderParams);
    });

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
});
