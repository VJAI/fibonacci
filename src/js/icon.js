export class IconElement extends HTMLElement {
  
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
    useElement.setAttribute('xlink:href', `./assets/bootstrap-icons.svg#${this.name}`);
    useElement.setAttribute('href', `./assets/bootstrap-icons.svg#${this.name}`);
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