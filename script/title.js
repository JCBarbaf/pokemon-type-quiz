class Title extends HTMLElement {

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
        :host {
          margin: 0;
          --container-color: rgb(238, 64, 53);
          --bottom-color: rgb(236, 236, 236);
        }
        .title-container {
          background: var(--container-color) linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%);
        }
        .title {
            margin: 0;
            padding: 2% 0;
            font-size: 2rem;
            text-align: center;
        }
        .white-part {
          height: 1.5rem;
          background: var(--bottom-color) linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0, 0, 0, 0.2) 80%, rgba(0,0,0,0.2) 100%);
          border-radius: 50rem;
          transform: translateY(50%)
        }
      </style>
      <div class="title-container">
        <h1 class="title">What type is this pokémon?</h1>
        <div class="white-part"></div>
      </div>
      `
    }
  }
  
  customElements.define('title-component', Title);