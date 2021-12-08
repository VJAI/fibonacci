(function () {
	// Handling Navigation Menu For Small Screens.
	var hamburger = document.querySelector('.cmp__hamburger'),
		selectControl = document.querySelector('.cmp__hidden-menu');
	
	hamburger.addEventListener('click', function () {
		selectControl.click();
	});
	
	hamburger.addEventListener('change', function (evt) {
		window.location.href = selectControl.value;
	});
	
	// Handling Search Input.
	var x = window.matchMedia('screen and (min-width: 768px)');
	var nav = document.querySelector('.cmp__blog-nav');
	var searchInput = document.querySelector('.cmp__search-form input');
	var searchIcon = document.querySelector('.cmp__search-form a');
	
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
