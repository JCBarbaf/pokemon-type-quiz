class TypeContainer extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.typeNumber = this.getAttribute('type-number')
    }
  
    connectedCallback () {
      document.addEventListener('reset', () => {
        this.removeType()
        this.hideTypeTwo(false)
      })
      document.addEventListener('hideTypeTwo', () => {
        if (this.typeNumber == 2) {
          this.hideTypeTwo(true)
        }
      })
      document.addEventListener('swapTypes', (event) => {
        if (this.typeNumber == event.detail.typeNumber) {
          this.typeHandler(event.detail.type)
        }
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          min-height: 28vh
        }
        .type-container.hidden {
          display: none;
        }
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
        if (event.dataTransfer.getData("application/json") && event.dataTransfer.getData("application/json") != 'null') {
          const dataObject = JSON.parse(event.dataTransfer.getData("application/json"));
          typeContainer.classList.add('loaded')
          if (dataObject.typeNumber) {
            document.dispatchEvent(new CustomEvent('swapTypes', {
              detail: {
                type: this.shadow.querySelector('type-component').type,
                typeNumber : dataObject.typeNumber
              }
            }))
          }
          this.typeHandler(dataObject.type)
        }
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
    hideTypeTwo(hide) {
      const typeContainer = this.shadow.querySelector('.type-container')
      if (hide) {
        typeContainer.classList.add('hidden')
      } else {
        typeContainer.classList.remove('hidden')
      }
    }
  }
  
  customElements.define('type-container-component', TypeContainer);