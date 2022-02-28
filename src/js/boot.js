export function init() {
  const header = document.querySelector('.cmp__blog-header'),
    nav = document.querySelector('.cmp__blog-nav'),
    selectControl = document.querySelector('.cmp__hidden-menu'),
    searchInput = document.querySelector('.cmp__search-form input'),
    searchIcon = document.querySelector('.cmp__search-form a'),
    hamburger = document.querySelector('.cmp__hamburger-link a'),
    contentScale = document.querySelector('cmp-content-scale'),
    blogContent = document.querySelector('.cmp__blog-content'),
    goTop = document.querySelector('.cmp__go-top'),
    startTime = performance.now();
  
  if (goTop) {
    goTop.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  const mediaQuery = window.matchMedia('screen and (min-width: 768px)');
  mediaQuery.addListener(mediaChangeHandler);
  
  function mediaChangeHandler(queryList) {
    if (queryList.matches) {
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
  
  function handleSelectChange() {
    const page = selectControl.value;
    
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
  }
  
  function handleWindowScroll() {
    if (contentScale) {
      if (window.pageYOffset >= header.offsetHeight) {
        contentScale.classList.add('cmp__sticky')
      } else {
        contentScale.classList.remove('cmp__sticky');
      }
    }
  }
  
  hamburger.addEventListener('click', () => selectControl.click());
  hamburger.addEventListener('change', handleSelectChange);
  window.addEventListener('scroll', handleWindowScroll);
  
  if (contentScale) {
    contentScale.setContent(document.querySelector('.cmp__article-content'));
  }
  
  mediaChangeHandler(mediaQuery);
}