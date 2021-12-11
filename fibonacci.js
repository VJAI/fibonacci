(function () {
	var hamburger = document.querySelector('.cmp__hamburger-link .cmp__nav-link'),
		selectControl = document.querySelector('.cmp__hidden-menu'),
		nav = document.querySelector('.cmp__blog-nav'),
		searchInput = document.querySelector('.cmp__search-form input'),
		searchIcon = document.querySelector('.cmp__search-form a');
	
	var x = window.matchMedia('screen and (min-width: 768px)');
	
	hamburger.addEventListener('click', function () {
		selectControl.click();
	});
	
	hamburger.addEventListener('change', function (evt) {
		var page = selectControl.value;
		
		if (!page) {
			return;
		}
		
		if (page === 'search') {
			nav.classList.add('cmp__search-active');
			document.body.addEventListener('click', documentClickHandler);
			searchInput.focus();
			return;
		}
		
		window.location.href = selectControl.value;
	});
	
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
		nav.classList.add('cmp__search-active');
		document.body.addEventListener('click', documentClickHandler);
		searchInput.focus();
		e.stopPropagation();
	}
	
	function documentClickHandler(e) {
		if (e.currentTarget === searchInput || e.currentTarget === searchIcon) {
			return;
		}
		
		nav.classList.remove('cmp__search-active');
		selectControl.value = null;
		document.body.removeEventListener('click', documentClickHandler);
	}
})();
