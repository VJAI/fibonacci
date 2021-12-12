(function () {
  const hamburger = document.querySelector('.cmp__hamburger-link a'),
    selectControl = document.querySelector('.cmp__hidden-menu'),
    nav = document.querySelector('.cmp__blog-nav'),
    searchInput = document.querySelector('.cmp__search-form input'),
    searchIcon = document.querySelector('.cmp__search-form a');
  
  const mediaQuery = window.matchMedia('screen and (min-width: 768px)');
  
  hamburger.addEventListener('click', function () {
    selectControl.click();
  });
  
  hamburger.addEventListener('change', function (evt) {
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
  });
  
  searchInput.addEventListener('click', function (e) {
    e.stopPropagation();
  });
  
  mediaChangeHandler(mediaQuery);
  mediaQuery.addListener(mediaChangeHandler);
  
  function mediaChangeHandler(quertList) {
    if (quertList.matches) {
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
  
  const iconTemplate = document.createElement('template');
  iconTemplate.innerHTML = `<div class="svg-wrap">
    <svg viewBox="0 0 16 16" width="16" height="16">
      <use></use>
    </svg>
  </div>`;
  
  // Icon Web Component.
  class IconElement extends HTMLElement {
    
    get name() {
      return this.getAttribute('name');
    }
    
    set name(value) {
      this.setAttribute('name', value);
    }
    
    get size() {
      return this.getAttribute('size');
    }
    
    set size(value) {
      this.setAttribute('size', value);
    }
    
    static get observedAttributes() {
      return ['name', 'size'];
    }
    
    constructor() {
      super();
      this.appendChild(iconTemplate.content.cloneNode(true));
    }
    
    attributeChangedCallback(attrName) {
      if (attrName === 'size') {
        const size = this.size || 16;
        this.style.width = `${size}px`;
        this.style.height = `${size}px`;
      }
      
      if (attrName === 'name') {
        const useElement = this.querySelector('use');
        useElement.setAttribute('xlink:href', `./assets/sprites.svg#${this.name}`);
        useElement.setAttribute('href', `./assets/sprites.svg#${this.name}`);
      }
    }
  }
  
  window.customElements.define('cmp-icon', IconElement);
})();
