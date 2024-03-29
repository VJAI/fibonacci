export class Carousel extends HTMLElement {

  constructor() {
    super();

    this._handleLatestPostsTabClick = this._handleLatestPostsTabClick.bind(this);
    this._handlePopularPostsTabClick = this._handlePopularPostsTabClick.bind(this);
    this._handlePreviousClick = this._handlePreviousClick.bind(this);
    this._handleNextClick = this._handleNextClick.bind(this);
    this._handleDotClick = this._handleDotClick.bind(this);
    this._handleMediaQueryChange = this._handleMediaQueryChange.bind(this);

    this._mediaQuery = window.matchMedia('(min-width: 768px)')
    this._currentTab = 'popular';
    this._currentPage = 0;
    this._noOfPages = 0;
  }

  connectedCallback() {
    if (!this._rendered) {
      const carouselTemplate = document.createElement('template');
      carouselTemplate.innerHTML = `<div class="cmp__carousel cmp__posts-carousel">
          <div class="cmp__carousel-tabs cmp__selected-first">
            <a class="cmp__carousel-tab cmp__carousel-tab-selected cmp__carousel-tab-popular" href="#">Popular Posts</a>
            <a class="cmp__carousel-tab cmp__carousel-tab-latest" href="#">Latest Posts</a>
          </div>

          <div class="cmp__carousel-pages-container">
            <div class="cmp__carousel-pages"></div>
          </div>

          <div class="cmp__carousel-nav">
            <a class="cmp__carousel-nav-previous" href="#">
              <cmp-icon size="12" name="arrow-left"></cmp-icon>
            </a>
            <a class="cmp__carousel-nav-next" href="#">
              <cmp-icon size="12" name="arrow-right"></cmp-icon>
            </a>
          </div>

          <div class="cmp__carousel-nav-dots">
          </div>
        </div>`;
      this.appendChild(carouselTemplate.content.cloneNode(true));

      this._pagesContainer = this.querySelector('.cmp__carousel-pages-container');
      this._pages = this._pagesContainer.querySelector('.cmp__carousel-pages');
      this._tabs = this.querySelector('.cmp__carousel-tabs');
      this._latestPostsTab = this.querySelector('.cmp__carousel-tab-latest');
      this._popularPostsTab = this.querySelector('.cmp__carousel-tab-popular');
      this._prevButton = this.querySelector('.cmp__carousel-nav-previous');
      this._nextButton = this.querySelector('.cmp__carousel-nav-next');
      this._navDots = this.querySelector('.cmp__carousel-nav-dots');
      this._renderTabContent();
      this._rendered = true;
    }

    this._latestPostsTab.addEventListener('click', this._handleLatestPostsTabClick);
    this._popularPostsTab.addEventListener('click', this._handlePopularPostsTabClick);
    this._prevButton.addEventListener('click', this._handlePreviousClick);
    this._nextButton.addEventListener('click', this._handleNextClick);
    this._mediaQuery.addEventListener('change', this._handleMediaQueryChange);
    window.addEventListener('resize', this._handleMediaQueryChange);
  }

  disconnectedCallback() {
    this._latestPostsTab.removeEventListener('click', this._handleLatestPostsTabClick);
    this._popularPostsTab.removeEventListener('click', this._handlePopularPostsTabClick);
    this._prevButton.removeEventListener('click', this._handlePreviousClick);
    this._nextButton.removeEventListener('click', this._handleNextClick);
    [...this._navDots.querySelectorAll('span')].forEach(e => e.removeEventListener('click', this._handleDotClick));
    this._mediaQuery.removeEventListener('change', this._handleMediaQueryChange);
    window.removeEventListener('resize', this._handleMediaQueryChange);
  }

  _handlePreviousClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this._currentPage <= 0) {
      return;
    }

    this._currentPage -= 1;
    this._navigateToPage();
  }

  _handleNextClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this._currentPage >= this._noOfPages) {
      return;
    }

    this._currentPage += 1;
    this._navigateToPage();
  }

  _handleLatestPostsTabClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this._currentTab === 'latest') {
      return;
    }

    this._currentTab = 'latest';
    this._renderTabContent();
    this._latestPostsTab.classList.add('cmp__carousel-tab-selected');
    this._popularPostsTab.classList.remove('cmp__carousel-tab-selected');
    this._tabs.classList.remove('cmp__selected-first');
    this._tabs.classList.add('cmp__selected-last');
  }

  _handlePopularPostsTabClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this._currentTab === 'popular') {
      return;
    }

    this._currentTab = 'popular';
    this._renderTabContent();
    this._latestPostsTab.classList.remove('cmp__carousel-tab-selected');
    this._popularPostsTab.classList.add('cmp__carousel-tab-selected');
    this._tabs.classList.add('cmp__selected-first');
    this._tabs.classList.remove('cmp__selected-last');
  }

  _handleDotClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this._currentPage = parseInt(e.target.getAttribute('data-index'));
    this._navigateToPage();
  }

  _handleMediaQueryChange() {
    this._setNavPositions();
  }

  _renderTabContent() {
    const tabTpl = this.querySelector(`#tpl_${this._currentTab}`);
    this._pages.innerHTML = '';
    this._pages.appendChild(tabTpl.content.cloneNode(true));
    this._currentPage = 0;
    this._noOfPages = this._pages.querySelectorAll('.cmp__carousel-page').length;
    this._figure = this.querySelector('.cmp__carousel-post-img');
    this._navDots.innerHTML = '';
    if (this._noOfPages) {
      this._navDots.style.display = 'flex';
      for (let i = 0; i < this._noOfPages; i++) {
        const spanEl = document.createElement('span');
        spanEl.setAttribute('data-index', i.toString());
        this._navDots.appendChild(spanEl);
      }
      this._navDots.querySelector('span').classList.add('cmp__dot-selected');
      [...this._navDots.querySelectorAll('span')].forEach(e => e.addEventListener('click', this._handleDotClick));
    } else {
      this._navDots.style.display = 'none';
    }
    this._setButtonsVisibility();
    this._setNavPositions();
  }

  _setNavPositions() {
    const setPosition = (pos) => {
      this._nextButton.style.top = pos;
      this._prevButton.style.top = pos;
    };

    if (this._mediaQuery.matches) {
      setPosition(`calc(50% - 12px)`);
      return;
    }

    const carouselRect = this.getBoundingClientRect(),
      postImage = this._figure.querySelector('img'),
      deduceAndSetPosition = () => {
        const figureRect = this._figure.getBoundingClientRect();
        const iconTopPos = (figureRect.top - carouselRect.top) + (figureRect.height / 2) - 12;
        setPosition(`${iconTopPos}px`);
      };

    if (this._isImageLoaded(postImage)) {
      deduceAndSetPosition();
      return;
    }

    setPosition(`calc(50% - 12px)`);
    postImage.removeEventListener('load', deduceAndSetPosition);
    postImage.addEventListener('load', deduceAndSetPosition);
  }

  _isImageLoaded(img) {
    return img.complete && img.naturalHeight !== 0;
  }

  _navigateToPage() {
    this._pages.style.transform = `translateX(${-100 * this._currentPage }%)`;
    const currentPage = [...this._pages.querySelectorAll('.cmp__carousel-page')][this._currentPage];
    this._figure = currentPage.querySelector('.cmp__carousel-post-img');
    this._setButtonsVisibility();
    this._setNavPositions();
  }

  _setButtonsVisibility() {
    if (this._noOfPages <= 1) {
      this._prevButton.style.display = 'none';
      this._nextButton.style.display = 'none';
      return;
    }

    if (this._currentPage <= 0) {
      this._prevButton.style.display = 'none';
    } else {
      this._prevButton.style.display = 'flex';
    }

    if (this._currentPage >= this._noOfPages - 1) {
      this._nextButton.style.display = 'none';
    } else {
      this._nextButton.style.display = 'flex';
    }

    [...this._navDots.querySelectorAll('span')].forEach((e, index) => {
      if (index === this._currentPage) {
        e.classList.add('cmp__dot-selected');
        return;
      }
      e.classList.remove('cmp__dot-selected');
    });
  }
}

window.customElements.define('cmp-carousel', Carousel);