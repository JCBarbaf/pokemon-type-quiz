class Type extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback () {
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        
      </style>
      <div class="type">
        <img class="type-icon" src="img/types/fire_type.svg" alt="" title="">
        <p>fire</p>
      </div>
      `
    }
  }
  
  customElements.define('type-component', Type);