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

jQuery(function () {
    const homeSlider = new Swiper('.home-slider .swiper', {
        loop: true,
    });

    const homePromoSlider = new Swiper('.promo-section  .swiper', {
        loop: true,
    });

    const specialistsSlider = new Swiper('.specialists-slider .swiper', {
        loop: true,
        slidesPerView: 6,
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
