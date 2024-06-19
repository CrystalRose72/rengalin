(() => {
	const $ddown = $('.d-down');

	$ddown.on('click', function(e) {
		console.log([e.target, !e.target.closest('.d-down__menu')]);
		if (!e.target.closest('.d-down__menu') || e.target.hasClass('d-down__menu'))
			e.preventDefault();
			$(this).toggleClass('d-down_opened');
	})

	$(window).on('click', function(e) {
		if($ddown.hasClass('d-down_opened') && !e.target.closest('.d-down'))
			$ddown.removeClass('d-down_opened');
	});

})();
