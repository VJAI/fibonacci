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
    
    constructor() {
      super();
      const iconTemplate = document.createElement('template');
      iconTemplate.innerHTML = `<div class="svg-wrap">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <use></use>
        </svg>
      </div>`;
      this.appendChild(iconTemplate.content.cloneNode(true));
    }
    
    attributeChangedCallback(attrName) {
      if (attrName === 'size') {
        if (this.size) {
          this.style.width = `${this.size}px`;
          this.style.height = `${this.size}px`;
        } else {
          this.style.width = this.style.height = 'auto';
        }
      }
      
      if (attrName === 'name') {
        const useElement = this.querySelector('use');
        useElement.setAttribute('xlink:href', `./assets/sprites.svg#${this.name}`);
        useElement.setAttribute('href', `./assets/sprites.svg#${this.name}`);
      }
    }
  }
  
  window.customElements.define('cmp-icon', IconElement);
  
  // Content scroll indicator web component.
  class ContentScaleElement extends HTMLElement {
    
    constructor() {
      super();
      const contentScaleTemplate = document.createElement('template');
      contentScaleTemplate.innerHTML = `
        <div class="cmp__bar"></div>
        <div class="cmp__ticks-container"></div>
        <div class="cmp__scroll-progress"></div>`;
      this.appendChild(contentScaleTemplate.content.cloneNode(true));
      
      const ticksContainer = this.querySelector('.cmp__ticks-container');
      for (let i = 0; i < 10; i++) {
        const tickEl = document.createElement('div');
        tickEl.classList.add('cmp__tick');
        ticksContainer.appendChild(tickEl);
        const childTickContainerEl = document.createElement('div');
        childTickContainerEl.classList.add('cmp__ticks-container');
        tickEl.appendChild(childTickContainerEl);
        
        for (let i = 0; i < 10; i++) {
          const tickEl = document.createElement('div');
          tickEl.classList.add('cmp__tick');
          childTickContainerEl.appendChild(tickEl);
        }
      }
      
      this._handleScroll = this._handleScroll.bind(this);
      this._handleResize = this._handleResize.bind(this);
      this._scrollProgress = this.querySelector('.cmp__scroll-progress');
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
    
    constructor() {
      super();
      const imageElementTemplate = document.createElement('template');
      imageElementTemplate.innerHTML = `
        <div class="cmp__image-info">
          <cmp-icon name="image"></cmp-icon>
          <span class="cmp__status-text"></span>
        </div>
        <cmp-progress class="cmp__first"></cmp-progress>
        <cmp-progress class="cmp__last"></cmp-progress>`;
      this.appendChild(imageElementTemplate.content.cloneNode(true));
    }
    
    connectedCallback() {
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
    }
    
    attributeChangedCallback() {
      // Not handled!
    }
  }
  
  window.customElements.define('cmp-image', ImageElement);
  
  // Progress element.
  class SquaresProgressElement extends HTMLElement {
    
    constructor() {
      super();
      const progressTemplate = document.createElement('template');
      progressTemplate.innerHTML = `<div class="cmp__squares-container">
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
        <div class="cmp__square"></div>
      </div>`;
      this.appendChild(progressTemplate.content.cloneNode(true));
    }
  }
  
  window.customElements.define('cmp-progress', SquaresProgressElement);
  
  // No use color dots.
  class ColorDotsElement extends HTMLElement {
    constructor() {
      super();
      const template = document.createElement('template');
      template.innerHTML = `<div class="cmp__dots-container">
        <div class="cmp__dot"></div>
        <div class="cmp__dot"></div>
        <div class="cmp__dot"></div>
        <div class="cmp__dot"></div>
      </div>`;
      this.appendChild(template.content.cloneNode(true));
    }
  }
  
  window.customElements.define('cmp-color-dots', ColorDotsElement);
  
  // Simple decorative element to attract users.
  class WordsFallElement extends HTMLElement {
    
    constructor() {
      super();
      
      this._wordsCloud = [];
      this._sizes = ['1.212rem'];
      this._interval = 1000;
      this._intervalId = null;
      this._lanes = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5];
      this._lastLaneIndex = null;
      this._lastWord = 0;
      this._totalPopulation = 15;
      this._population = 0;
      this._isCustomFontLoaded = false;
      this._enabled = false;
      
      this._startTimer = this._startTimer.bind(this);
      this._stopTimer = this._stopTimer.bind(this);
      this._handleResize = this._handleResize.bind(this);
      this._mediaChangeHandler = this._mediaChangeHandler.bind(this);
      
      this._mediaQuery = window.matchMedia('screen and (min-width: 768px)');
    }
    
    _startTimer() {
      if (this._intervalId || this._wordsCloud.length === 0) {
        return;
      }
      
      this._intervalId = setInterval(() => this._pickWord(), this._interval);
    }
    
    _stopTimer() {
      if (!this._intervalId) {
        return;
      }
      
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    
    _getPopulationAndSizesForMedia(queryList) {
      return queryList.matches ? {
        totalPopulation: 15,
        sizes: ['1.781rem']
      } : {
        totalPopulation: 10,
        sizes: ['1.212rem']
      };
    }
    
    _mediaChangeHandler(queryList) {
      this.reset(this._getPopulationAndSizesForMedia(queryList));
    }
    
    _getRandomNo(max) {
      return ~~(Math.random() * max);
    }
    
    _pickWord() {
      if (this._population >= this._totalPopulation) {
        return;
      }
      
      const allowedLanes = [...this._lanes];
      
      if (this._lastLaneIndex !== null) {
        const startIndex = Math.max(0, this._lastLaneIndex - 2),
          endIndex = Math.min(allowedLanes.length - 1, this._lastLaneIndex + 2);
        
        allowedLanes.splice(startIndex, (endIndex - startIndex) + 1);
      }
      
      this._lastLaneIndex = this._getRandomNo(allowedLanes.length);
      
      const word = this._wordsCloud[ this._lastWord++ ],
        size = this._sizes[ this._getRandomNo(this._sizes.length) ],
        lane = allowedLanes[ this._lastLaneIndex ];
  
      this._lastWord = this._lastWord >= this._wordsCloud.length ? 0 : this._lastWord;
      
      const wordElement = document.createElement('div');
      wordElement.classList.add('cmp__word');
      wordElement.innerHTML = word;
      wordElement.style.left = `${lane * 10}%`;
      wordElement.style.fontSize = size
      wordElement.addEventListener('animationend', () => {
        wordElement.remove();
        this._population--;
      });
      this.appendChild(wordElement);
      const worldElementRec = wordElement.getBoundingClientRect(),
        diff = worldElementRec.right - this._compRec.right;
      if (diff > 0) {
        wordElement.style.left = `calc(${lane * 10}% - ${diff + 10}px)`;
      }
      this._population++;
    }
    
    _setArgs(args) {
      const {
        wordsCloud,
        sizes,
        totalPopulation
      } = args;
      
      Array.isArray(wordsCloud) && (this._wordsCloud = wordsCloud);
      Array.isArray(sizes) && (this._sizes = sizes);
      typeof totalPopulation === 'number' && (this._totalPopulation = totalPopulation);
    }
    
    _handleResize() {
      this._compRec = this.getBoundingClientRect();
    }
    
    connectedCallback() {
      this._compRec = this.getBoundingClientRect();
      window.addEventListener('focus', this._startTimer);
      window.addEventListener('blur', this._stopTimer);
      window.addEventListener('resize', this._handleResize);
      this._mediaQuery.addListener(this._mediaChangeHandler);
    }
    
    disconnectedCallback() {
      this.deactivate();
      window.removeEventListener('focus', this._startTimer);
      window.removeEventListener('blur', this._stopTimer);
      window.addEventListener('resize', this._handleResize);
      this._mediaQuery.removeListener(this._mediaChangeHandler);
    }
    
    init(args) {
      const updatedArgs = { ...args, ...this._getPopulationAndSizesForMedia(this._mediaQuery) };
      this._setArgs(updatedArgs);
    }
    
    reset(args) {
      this.deactivate();
      this._setArgs(args);
      this._enabled && this.activate();
    }
    
    activate() {
      this._enabled = true;
      
      if (this._isCustomFontLoaded) {
        this._startTimer();
        return;
      }
      
      WebFont.load({
        google: {
          families: ['Monofett']
        },
        timeout: 5000,
        fontactive: () => {
          this._isCustomFontLoaded = true;
          this._enabled && this._startTimer();
        }
      });
    }
    
    deactivate() {
      this._enabled = false;
      this._stopTimer();
    }
  }
  
  window.customElements.define('cmp-words-fall', WordsFallElement);
  
  //**** Boot function ****/
  function init() {
    const header = document.querySelector('.cmp__blog-header'),
      nav = document.querySelector('.cmp__blog-nav'),
      selectControl = document.querySelector('.cmp__hidden-menu'),
      searchInput = document.querySelector('.cmp__search-form input'),
      searchIcon = document.querySelector('.cmp__search-form a'),
      hamburger = document.querySelector('.cmp__hamburger-link a'),
      contentScale = document.querySelector('cmp-content-scale'),
      wordsFall = document.querySelector('cmp-words-fall'),
      blogContent = document.querySelector('.cmp__blog-content'),
      startTime = performance.now();
    
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
      
      if (wordsFall) {
        if (window.scrollY >= blogContent.offsetTop - 40) {
          wordsFall.deactivate();
        } else {
          wordsFall.activate();
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
    
    if (wordsFall) {
      wordsFall.init({
        wordsCloud: [
          'html',
          'CSS',
          'JS',
          'C#',
          '.NET',
          'SQL',
          'python',
          'ASP.NET MVC',
          'PWD',
          'Angular',
          'React',
          'backbone',
          'meteorjs',
          'fibonacci',
          'UX',
          'front-end',
          'firebase',
          'XML',
          'Android',
          'Ruby',
          'Docker',
          'kubernetes',
          'Azure Cloud',
          'Salesforce',
          'CRM',
          'AI',
          'Analytics',
          'Big Data',
          'cordova',
          'jQuery',
          'web components'
        ]
      });
      
      if (window.scrollY < blogContent.offsetTop - 40) {
        wordsFall.activate();
      }
    }
    
    mediaChangeHandler(mediaQuery);
  }
  
  init();
})();
