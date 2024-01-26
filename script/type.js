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
        :host {
          --normal-color: rgb(144, 153, 161);
          --fire-color: rgb(255, 156, 84);
          --water-color: rgb(77, 144, 213);
          --grass-color: rgb(99, 187, 91);
          --electric-color: rgb(243, 210, 59);
          --ice-color: rgb(116, 206, 192);
          --fighting-color: rgb(206, 64, 105);
          --poison-color: rgb(171, 106, 200);
          --ground-color: rgb(217, 119, 70);
          --flying-color: rgb(0, 135, 255);
          --psychic-color: rgb(249, 113, 118);
          --bug-color: rgb(144, 193, 44);
          --rock-color: rgb(199, 183, 139);
          --ghost-color: rgb(82, 105, 172);
          --dragon-color: rgb(10, 109, 196);
          --dark-color: rgb(90, 83, 102);
          --steel-color: rgb(90, 142, 161);
          --fairy-color: rgb(236, 143, 230);
          --grey-color: rgb(122, 122, 122);
        }
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
          background-color: var(--${this.type ? this.type : 'grey'}-color);
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