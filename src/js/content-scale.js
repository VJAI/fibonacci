export class ContentScaleElement extends HTMLElement {
  
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