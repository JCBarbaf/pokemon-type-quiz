class Background extends HTMLElement {

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
        .background {
          width: 200vw;
          height: 300vh;
          position: fixed;
          top: -100vh;
          bottom: 0;
          left: -50vw;
          right: 0;
          background: url(../img/background.svg);
          background-size: 25%;
          background-attachment: fixed;
          transform: rotate(-30deg);
          z-index: -100;
        }
      </style>
      <div class="background"></div>
      `
    }
  }
  
  customElements.define('background-component', Background);