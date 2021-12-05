(function () {
	var x = window.matchMedia('screen and (min-width: 560px)');
	var nav = document.querySelector('.cmp__blog-nav');
	var searchInput = document.querySelector('.cmp__search-form input');
	var searchIcon = document.querySelector('.cmp__search-form span');

	searchInput.addEventListener('click', function (e) {
		e.stopPropagation();
	});

	f(x);
	x.addListener(f);

	function f(x) {

		if (x.matches) {
			searchIcon.removeEventListener('click', searchIconClickHandler);
		} else {
			searchIcon.addEventListener('click', searchIconClickHandler);
		}
	}

	function searchIconClickHandler(e) {
		nav.classList.add('search-active');
		document.body.addEventListener('click', documentClickHandler);
		searchInput.focus();
		e.stopPropagation();
	}

	function documentClickHandler(e) {
		if (e.currentTarget === searchInput || e.currentTarget === searchIcon) {
			return;
		}

		nav.classList.remove('search-active');
		document.body.removeEventListener('click', documentClickHandler);
	}
})();

