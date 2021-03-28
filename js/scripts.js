$(() => {
	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Страица товара - слайдер
	if ($('.product_info .images .swiper-container').length) {
		const thumbsSlider = new Swiper('.product_info .thumbs', {
			loop: false,
			speed: 500,
			freeMode: true,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 7,
			slidesPerView: 3
		})

		new Swiper('.product_info .images .big', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			thumbs: {
				swiper: thumbsSlider
			}
		})
	}


	// Календарь
	$('.input.date').datepicker({
		autoClose: true
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight(),
		mobHeaderHeight = $('.mob_header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	$('.mob_header').wrap('<div class="mob_header_wrap"></div>')
	$('.mob_header_wrap').height(mobHeaderHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')

	headerInit && $(window).scrollTop() > mobHeaderHeight
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')
	$('.mob_header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()
		mobHeaderHeight = $('.mob_header').outerHeight()

		$('.header_wrap').height(headerHeight)
		$('.mob_header_wrap').height(mobHeaderHeight)

		headerInit && $(window).scrollTop() > headerHeight
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')

		headerInit && $(window).scrollTop() > mobHeaderHeight
			? $('.mob_header').addClass('fixed')
			: $('.mob_header').removeClass('fixed')
	}, 100)
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')

	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > mobHeaderHeight
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}