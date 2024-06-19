import scrollLock from 'scroll-lock';

(() => {
	///
	const $header = $('.header');
	const $shell = $header.find('.header__menu-blind');
	const $toggle = $header.find('.header__menu-toggle');
	const vh = window.innerHeight * 0.01; // решение проблемы 100vh для меню на мобильных устройствах

	$('.header__menu-blind__close').on('click', function(e) {
		$toggle.trigger('click');
	})


	$toggle.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('opened');
		$shell.toggleClass('opened');

		if($shell.hasClass('opened')) {
			$shell.css({'max-width': parseInt($shell.css('max-width')) + scrollLock.getPageScrollBarWidth()});
			scrollLock.disablePageScroll();
			return;
		}

		$shell.removeAttr('style');
		scrollLock.clearQueueScrollLocks();
		scrollLock.enablePageScroll();
	});


	
	$(window).on('resize', function(e) {
		if($shell.not('.opened').length)
			$('.menu__submenu').removeAttr('style');
	});


	$(window).on('click', function(e) {
		if($shell.hasClass('opened') && !e.target.closest('.header__menu-blind')) {
			e.preventDefault();
			$toggle.toggleClass('opened');
			$shell.toggleClass('opened').removeAttr('style');
			scrollLock.clearQueueScrollLocks();
			scrollLock.enablePageScroll();
		}
	});


	$(window).on('scroll', function() {
		const $headerWrap = $('.header-wrap');
		//if ($header) {
		$('body')[($(this).scrollTop() > 30 ? 'add': 'remove') + 'Class']('is-sticky-header');
		$header[($(this).scrollTop() > 30 ? 'add': 'remove') + 'Class']('header_filled');
		//}
		if($headerWrap.hasClass('services-open')) {
			console.log('all');
			$('.js-toggle-header-services').trigger('click');
		}
	});

	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
})();
