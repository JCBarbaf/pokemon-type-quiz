class TypeContainer extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.typeNumber = this.getAttribute('type-number');
    }
  
    connectedCallback () {
      document.addEventListener('reset', () => {
        this.removeType()
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        .type-title {
          margin: auto;
          text-align: center;
          margin-bottom: 10%;
        }
        .type-drop {
          position: relative;
        }
        .remove-type {
          --size: 1.5rem;
          width: var(--size);
          height: var(--size);
          position: absolute;
          top: 0;
          right: 10%;
          display: none;
          justify-content: center;
          align-items: center;
          background-color: rgb(238, 64, 53);
          color: inherit;
          border: none;
          border-radius: 10rem;
          cursor: pointer;
        }
        .remove-type:hover {
          filter: brightness(0.9);
        }
        .type-container.loaded .type-drop:hover .remove-type {
          display: flex;
        }
      </style>
      <div class="type-container">
        <h3 class="type-title">Type ${this.typeNumber}</h3>
        <div class="type-drop">
          <button class="remove-type">X</button>
          <type-component type-number="${this.typeNumber}"></type-component>
        </div>
      </div>
      `
      const typeContainer = this.shadow.querySelector('.type-container')
      typeContainer.addEventListener('dragover', (event) => {
        event.preventDefault()
      })
      typeContainer.addEventListener('drop', (event) => {
        event.preventDefault()
        typeContainer.classList.add('loaded')
        this.typeHandler(event.dataTransfer.getData("type"))
      })
      typeContainer.addEventListener('click', (event) => {
        if(event.target.closest('.remove-type')) {
          this.removeType()
        }
      })
    }
    typeHandler(type) {
      this.shadow.querySelector('type-component').type = type
      document.dispatchEvent(new CustomEvent('updateType', {
        detail: {
          typeNumber: this.typeNumber,
          type: type
        }
      }));
    }
    removeType () {
      const typeContainer = this.shadow.querySelector('.type-container')
      typeContainer.classList.remove('loaded')
      this.typeHandler(null)
    }
  }
  
  customElements.define('type-container-component', TypeContainer);