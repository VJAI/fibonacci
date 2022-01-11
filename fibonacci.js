(function () {
  
  //***** Re-usable web components *****//
  
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
    
    _setIcon() {
      const useElement = this.querySelector('use');
      useElement.setAttribute('xlink:href', `./assets/sprites.svg#${this.name}`);
      useElement.setAttribute('href', `./assets/sprites.svg#${this.name}`);
    }
    
    _setSize() {
      if (this.size) {
        this.style.width = `${this.size}px`;
        this.style.height = `${this.size}px`;
      } else {
        delete this.style.width;
        delete this.style.height;
      }
    }
    
    connectedCallback() {
      if (!this._rendered) {
        const iconTemplate = document.createElement('template');
        iconTemplate.innerHTML = `<svg viewBox="0 0 16 16" width="16" height="16">
          <use></use>
        </svg>`;
        this.appendChild(iconTemplate.content.cloneNode(true));
        this._rendered = true;
      }
      
      this._setIcon();
      this._setSize();
    }
    
    attributeChangedCallback(attrName) {
      if (!this._rendered) {
        return;
      }
      
      if (attrName === 'size') {
        this._setSize();
      }
      
      if (attrName === 'name') {
        this._setIcon();
      }
    }
  }
  
  window.customElements.define('cmp-icon', IconElement);
  
  // Content scroll indicator web component.
  class ContentScaleElement extends HTMLElement {
    
    constructor() {
      super();
      this._handleScroll = this._handleScroll.bind(this);
      this._handleResize = this._handleResize.bind(this);
      this._winHeight = window.innerHeight;
    }
    
    _setScrollProgress() {
      const winScrollTop = window.scrollY,
        computedRect = this._articleContent.getBoundingClientRect(),
        amountScrolled = this._winHeight - computedRect.top,
        pctScrolled = amountScrolled / computedRect.height * 100,
        delta = 100;
      
      let adjustedPctScrolled;
      if (winScrollTop <= delta || pctScrolled < 1) {
        adjustedPctScrolled = 0;
      } else if (amountScrolled > computedRect.height + delta) {
        adjustedPctScrolled = 105;
      } else {
        adjustedPctScrolled = Math.floor(pctScrolled);
      }
      
      if (adjustedPctScrolled === 0) {
        this._scrollProgress.style.display = 'none';
        this._scrollProgress.style.width = '0%';
        return;
      }
      
      this._scrollProgress.style.display = 'block';
      this._scrollProgress.style.width = `${adjustedPctScrolled}%`;
    }
    
    _handleResize() {
      this._winHeight = window.innerHeight;
      this._setScrollProgress();
    }
    
    _handleScroll() {
      this._setScrollProgress();
    }
    
    connectedCallback() {
      if (!this._rendered) {
        const contentScaleTemplate = document.createElement('template');
        contentScaleTemplate.innerHTML = `
        <div class="cmp__bar"></div>
        <div class="cmp__scroll-progress"></div>`;
        this.appendChild(contentScaleTemplate.content.cloneNode(true));
        this._scrollProgress = this.querySelector('.cmp__scroll-progress');
        this._rendered = true;
      }
      
      window.addEventListener('resize', this._handleResize);
      window.addEventListener('scroll', this._handleScroll);
    }
    
    disconnectedCallback() {
      window.removeEventListener('resize', this._handleResize);
      window.removeEventListener('scroll', this._handleScroll);
    }
    
    setContent(contentEl) {
      this._articleContent = contentEl;
      this._scrollProgress.classList.add('cmp__no-transition');
      setTimeout(() => {
        this._setScrollProgress();
        this._scrollProgress.classList.remove('cmp__no-transition');
      });
    }
  }
  
  window.customElements.define('cmp-content-scale', ContentScaleElement);
  
  // Gracefully renders images.
  class ImageElement extends HTMLElement {
    
    get src() {
      return this.getAttribute('src');
    }
    
    set src(value) {
      this.setAttribute('src', value);
    }
    
    get alt() {
      return this.getAttribute('alt');
    }
    
    set alt(value) {
      this.setAttribute('alt', value);
    }
    
    get width() {
      return this.getAttribute('width');
    }
    
    set width(value) {
      this.setAttribute('width', value);
    }
    
    get height() {
      return this.getAttribute('height');
    }
    
    set height(value) {
      this.setAttribute('height', value);
    }
    
    get responsive() {
      return this.getAttribute('responsive');
    }
    
    set responsive(value) {
      this.setAttribute('responsive', value);
    }
    
    static get observedAttributes() {
      return ['src', 'alt', 'width', 'height', 'responsive'];
    }
    
    connectedCallback() {
      if (this._rendered) {
        return;
      }
      
      const imageElementTemplate = document.createElement('template');
      imageElementTemplate.innerHTML = `
        <div class="cmp__image-info">
          <cmp-icon name="image"></cmp-icon>
          <span class="cmp__status-text"></span>
        </div>
        <cmp-progress class="cmp__first"></cmp-progress>
        <cmp-progress class="cmp__last"></cmp-progress>`;
      this.appendChild(imageElementTemplate.content.cloneNode(true));
      
      this.style.aspectRatio = this.width / this.height;
      
      const statusElement = document.querySelector('.cmp__status-text');
      statusElement.innerHTML = this.alt;
      
      const img = document.createElement('img');
      img.style.filter = 'blur(4px)';
      img.addEventListener('load', () => {
        this.classList.add('cmp__image-loaded');
        this.appendChild(img);
        setTimeout(() => {
          img.style.filter = 'blur(0)';
        }, 500);
      });
      img.addEventListener('error', () => {
        this.classList.add('cmp__image-error');
        statusElement.innerHTML = 'Failed to load image';
      });
      img.src = this.src;
      this._rendered = true;
    }
    
    attributeChangedCallback() {
      // Not handled!
    }
  }
  
  window.customElements.define('cmp-image', ImageElement);
  
  // Progress element.
  class SquaresProgressElement extends HTMLElement {
    
    connectedCallback() {
      if (this._rendered) {
        return;
      }
      
      const progressTemplate = document.createElement('template');
      progressTemplate.innerHTML = `<div class="cmp__squares-container">
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
      </div>`;
      this.appendChild(progressTemplate.content.cloneNode(true));
      this._rendered = true;
    }
  }
  
  window.customElements.define('cmp-progress', SquaresProgressElement);
  
  // No use color dots.
  class ColorDotsElement extends HTMLElement {
    
    connectedCallback() {
      if (this._rendered) {
        return;
      }
      
      const template = document.createElement('template');
      template.innerHTML = `<div class="cmp__dots-container">
        <div class="cmp__dot"></div>
        <div class="cmp__dot"></div>
        <div class="cmp__dot"></div>
        <div class="cmp__dot"></div>
      </div>`;
      this.appendChild(template.content.cloneNode(true));
      this._rendered = true;
    }
  }
  
  window.customElements.define('cmp-color-dots', ColorDotsElement);
  
  //**** Boot function ****/
  function init() {
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
    
    function handeOnLoad() {
      const endTime = performance.now(),
        diff = (endTime - startTime) / 1000;
      
      if (diff > 2) {
        document.body.classList.remove('cmp__site-loading', 'cmp__no-transition');
        return;
      }
      
      setTimeout(() => {
        document.body.classList.remove('cmp__site-loading', 'cmp__no-transition');
      }, 100);
    }
    
    hamburger.addEventListener('click', () => selectControl.click());
    hamburger.addEventListener('change', handleSelectChange);
    window.addEventListener('scroll', handleWindowScroll);
    document.addEventListener('DOMContentLoaded', handeOnLoad);
    
    if (contentScale) {
      contentScale.setContent(document.querySelector('.cmp__article-content'));
    }
    
    mediaChangeHandler(mediaQuery);
  }
  
  init();
})();
