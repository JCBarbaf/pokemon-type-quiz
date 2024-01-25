class Type extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.type = this.getAttribute('type');
      this.typeColor = this.getAttribute('type-color');
    }
  
    connectedCallback () {
      document.addEventListener('updateType', (event => {
        this.render()
      }));
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
        .type-container {
          display: block;
          --size: 8rem;
          width: var(--size);
          height: var(--size);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${this.typeColor ? this.typeColor : 'grey'};
          border: 0.4rem solid rgb(0,0,0,0.2);
          border-radius: 50%;
          box-shadow: 0.3rem 0.3rem 0 0 rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .type-container img {
          --size: 90%;
          width: var(--size);
          height: var(--size);
        }
        .type-container:has(img):hover {
          transform: scale(1.05);
        }
        .type-name {
          text-align: center;
          text-transform: capitalize;
        }
      </style>
      <div class="type">
        <div class="type-container"></div>
        <p class="type-name">${this.type ?? 'none'}</p>
      </div>
      `
      const typeContainer = this.shadow.querySelector('.type-container')
      if (this.type) {
        typeContainer.draggable =  true
        let typeIcon = document.createElement('img')
        typeIcon.src = `img/type_icons/${this.type}_type.svg`
        typeIcon.alt = this.type
        typeIcon.alt = this.type
        typeIcon.draggable =  false
        typeContainer.appendChild(typeIcon)
      }
      typeContainer.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("type", this.type);
      })
    }
  }
  
  customElements.define('type-component', Type);