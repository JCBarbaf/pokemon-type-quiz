class Type extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.type = this.getAttribute('type')
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
          background-color: red;
          border-radius: 50%;
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