class Type extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.type = this.getAttribute('type');
      this.typeColor = this.getAttribute('type-color');
    }
  
    connectedCallback () {
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        .type {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .type-icon {
          display: block;
          --size: 8rem;
          width: var(--size);
          height: var(--size);
          background-color: ${this.typeColor ? this.typeColor : 'grey'};
          border: 0.4rem solid rgb(0,0,0,0.2);
          border-radius: 50%;
          cursor: pointer;
        }
        .type-icon:hover {
          transform: scale(1.05);
        }
        .type-name {
          text-align: center;
        }
      </style>
      <div class="type">
        <img class="type-icon" src="img/type_icons/${this.type}_type.svg" alt="${this.type}" title="${this.type}">
        <p class="type-name">${this.type}</p>
      </div>
      `
    }
  }
  
  customElements.define('type-component', Type);