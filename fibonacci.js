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
        <div class="cmp__ticks-container">
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
              <div class="cmp__tick"></div>
            </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
          <div class="cmp__tick">
            <div class="cmp__ticks-container">
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
                <div class="cmp__tick"></div>
              </div>
          </div>
        </div>
        <div class="cmp__scroll-progress"></div>`;
      this.appendChild(contentScaleTemplate.content.cloneNode(true));
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
  
  // Simple decorative element to attract users.
  class WordsFallElement extends HTMLElement {
    
    constructor() {
      super();
      
      this._wordsCloud = [];
      this._sizes = ['1.212rem', '1.470rem', '1.781rem'];
      this._interval = 500;
      this._intervalId = null;
      this._lanes = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5];
      this._totalPopulation = 15;
      this._population = 0;
      
      const wordsFallTemplate = document.createElement('template');
      this.appendChild(wordsFallTemplate.content.cloneNode(true));
      this._startTimer = this._startTimer.bind(this);
      this._stopTimer = this._stopTimer.bind(this);
    }
    
    _startTimer() {
      if (this._intervalId || this._wordsCloud.length === 0) {
        return;
      }
      
      this._intervalId = setInterval(() => this._pickWords(), this._interval);
    }
    
    _stopTimer() {
      if (!this._intervalId) {
        return;
      }
      
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    
    _getRandomNo(max) {
      return ~~(Math.random() * max);
    }
    
    _pickWords() {
      if (this._population >= this._totalPopulation) {
        return;
      }
      
      const word = this._wordsCloud[ this._getRandomNo(this._wordsCloud.length) ],
        lane = this._lanes[ this._getRandomNo(this._lanes.length) ],
        size = this._sizes[ this._getRandomNo(this._sizes.length) ];
      
      const wordElement = document.createElement('div');
      wordElement.classList.add('cmp__word');
      wordElement.innerHTML = word;
      wordElement.style.left = `${lane * 10}%`;
      wordElement.style.fontSize = size;
      wordElement.addEventListener('animationend', () => {
        wordElement.remove();
        this._population--;
      });
      this.appendChild(wordElement);
      this._population++;
    }
    
    connectedCallback() {
      window.addEventListener('focus', this._startTimer);
      window.addEventListener('blur', this._stopTimer);
    }
    
    disconnectedCallback() {
      window.removeEventListener('focus', this._startTimer);
      window.removeEventListener('blur', this._stopTimer);
      this._stopTimer();
    }
    
    init(args) {
      const {
        wordsCloud,
        sizes,
        colors,
        interval,
        totalPopulation
      } = args;
      
      Array.isArray(wordsCloud) && (this._wordsCloud = wordsCloud);
      Array.isArray(sizes) && (this._sizes = sizes);
      Array.isArray(colors) && (this._colors = colors);
      typeof interval === 'number' && (this._interval = interval);
      typeof totalPopulation === 'number' && (this._totalPopulation = totalPopulation);
      this._stopTimer();
      this._startTimer();
    }
    
    activate() {
      this._startTimer();
    }
    
    deactivate() {
      this._stopTimer();
    }
  }
  
  window.customElements.define('cmp-words-fall', WordsFallElement);
  
  //**** Boot function ****/
  function init() {
    const hamburger = document.querySelector('.cmp__hamburger-link a'),
      selectControl = document.querySelector('.cmp__hidden-menu'),
      header = document.querySelector('.cmp__blog-header'),
      nav = document.querySelector('.cmp__blog-nav'),
      searchInput = document.querySelector('.cmp__search-form input'),
      searchIcon = document.querySelector('.cmp__search-form a'),
      contentScale = document.querySelector('cmp-content-scale'),
      wordsFall = document.querySelector('cmp-words-fall'),
      blogContent = document.querySelector('.cmp__blog-content');
    
    let sticky = header.offsetHeight;
    
    const mediaQuery = window.matchMedia('screen and (min-width: 768px)');
    mediaQuery.addListener(mediaChangeHandler);
    
    function mediaChangeHandler(queryList) {
      let wordsFallArgs;
      
      if (queryList.matches) {
        wordsFallArgs = {
          totalPopulation: 15,
          sizes: ['1.212rem', '1.470rem', '1.781rem']
        };
        searchIcon.removeEventListener('click', searchIconClickHandler);
      } else {
        wordsFallArgs = {
          totalPopulation: 10,
          sizes: ['1rem', '1.212rem', '1.470rem']
        };
        searchIcon.addEventListener('click', searchIconClickHandler);
      }
      
      if (wordsFall) {
        WebFont.load({
          google: {
            families: ['Londrina Shadow']
          },
          timeout: 5000,
          fontactive: function () {
            wordsFall.init({
              ...wordsFallArgs,
              wordsCloud: [
                'html',
                'CSS',
                'JS',
                'C#',
                '.NET',
                'SQL',
                'python',
                'ASP.NET MVC',
                'progressive web development',
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
                'Mobile Development',
                'Docker',
                'kubernetes',
                'Azure Cloud',
                'Salesforce',
                'CRM dynamics',
                'AI',
                'Data Analytics',
                'Big Data',
                'cordova',
                'jQuery',
                'web components'
              ]
            });
            if (window.scrollY >= blogContent.offsetTop - 40) {
              wordsFall.deactivate();
            } else {
              wordsFall.activate();
            }
          },
        });
      }
    }
    
    function searchIconClickHandler(e) {
      nav.classList.add('cmp__search-active');
      document.body.addEventListener('click', documentClickHandler);
      searchInput.focus();
      e.stopPropagation();
    }
    
    function handleChangeInputClick(e) {
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
    
    function setScrollProgress() {
      if (!contentScale) {
        return;
      }
      
      const articleContent = document.querySelector('.cmp__article-content'),
        scrollProgress = contentScale.querySelector('.cmp__scroll-progress');
      
      const winHeight = window.innerHeight,
        computedRect = articleContent.getBoundingClientRect(),
        howMuchYouHaveSeen = winHeight - computedRect.top,
        pctScrolled = Math.floor(howMuchYouHaveSeen / computedRect.height * 100);
      
      let adjustedPctScrolled;
      if (pctScrolled <= 3) {
        adjustedPctScrolled = 0;
      } else if (pctScrolled >= 100) {
        adjustedPctScrolled = 105;
      } else {
        adjustedPctScrolled = pctScrolled;
      }
  
      if (adjustedPctScrolled === 0) {
        scrollProgress.style.display = 'none';
        scrollProgress.style.width = '0%';
        return;
      }
  
      scrollProgress.style.display = 'block';
      scrollProgress.style.width = `${adjustedPctScrolled}%`;
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
    
    function handleHamburgerClick() {
      selectControl.click();
    }
    
    function handleWindowScroll() {
      // Handling Content Scale.
      if (contentScale) {
        if (window.pageYOffset >= sticky) {
          contentScale.classList.add('cmp__sticky')
        } else {
          contentScale.classList.remove('cmp__sticky');
        }
        
        setScrollProgress();
      }
      
      // Wordsfall component.
      if (wordsFall) {
        if (window.scrollY >= blogContent.offsetTop - 40) {
          wordsFall.deactivate();
        } else {
          wordsFall.activate();
        }
      }
    }
    
    function handleWindowResize() {
      sticky = header.offsetHeight;
      setScrollProgress();
    }
    
    hamburger.addEventListener('click', handleHamburgerClick);
    hamburger.addEventListener('change', handleSelectChange);
    searchInput.addEventListener('click', handleChangeInputClick);
    window.addEventListener('scroll', handleWindowScroll);
    window.addEventListener('resize', handleWindowResize);
    
    mediaChangeHandler(mediaQuery);
    
    if (contentScale) {
      const scrollProgress = contentScale.querySelector('.cmp__scroll-progress');
      scrollProgress.classList.add('cmp__no-transition');
      
      setTimeout(() => {
        setScrollProgress();
        scrollProgress.classList.remove('cmp__no-transition');
      });
    }
  }
  
  init();
})();
