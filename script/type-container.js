class TypeContainer extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.typeNumber = this.getAttribute('type-number');
    }
  
    connectedCallback () {
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
      </style>
      <div class="type-container">
        <h3 class="type-title">Type ${this.typeNumber}</h3>
        <div class="type-drop">
          <type-component></type-component>
        </div>
      </div>
      `
      const typeContainer = this.shadow.querySelector('.type-container')
      typeContainer.addEventListener('dragover', (event) => {
        event.preventDefault()
      })
      typeContainer.addEventListener('drop', (event) => {
        event.preventDefault()
        this.shadow.querySelector('type-component').type = event.dataTransfer.getData("type")
        document.dispatchEvent(new CustomEvent('updateType'));
        // alert(event.dataTransfer.getData("type"))
        // this.render()
        // var data = ev.dataTransfer.getData("text");
      })
    }
  }
  
  customElements.define('type-container-component', TypeContainer);