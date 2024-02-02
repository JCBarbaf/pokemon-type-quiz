class LoadingScreen extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback () {
      document.addEventListener('loaded', () => {
        this.hide()
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          --pokedex-color: rgb(255, 51, 52);
          --border: 0.5rem solid rgb(180, 41, 42);
          --background-color1: rgb(123, 176, 208);
          --background-color2: rgb(113, 161, 189);
          --button1-color: rgb(51, 218, 255);
          --button2-color: rgb(251, 5, 5);
          --button3-color: rgb(252, 255, 22);
          --button4-color: rgb(105, 251, 34);
        }
        .loading-screen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          justify-content: center;
          align-items: center;
          background-color: rgb(0,0,0,0.5);
          z-index: 500;
        }
        .loading-screen.active {
          display: flex;
        }
        .pokedex {
          width: 85%;
          height: 80%;
          display: flex;
          flex-direction: column;
          background: repeating-linear-gradient(var(--background-color1) 0%, var(--background-color1) 3%, var(--background-color2) 4%, var(--background-color2) 6%, var(--background-color1) 7%);
          border: var(--border);
          border-radius: 1.5rem;
          outline: 2rem solid var(--pokedex-color);
        }
        .pokedex-header {
          display: flex;
        }
        .pokedex-buttons {
          box-sizing: border-box;
          width: 20%;
          display: flex;
          background-color: var(--pokedex-color);
          border-bottom: var(--border);
          border-right: var(--border);
          border-radius: 1rem 0;
          transform: translate(-2.5%, -7%);
        }
        .button {
          width: var(--size);
          height: var(--size);
          background-color: var(--button1-color);
          border: var(--border);
          border-width: 0.3rem;
          border-radius: 20rem;
        }
        .big.button {
          --size: 5rem;
          margin: 5%;
        }
        .small-buttons {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 5%;
          margin-top: 5%;
        }
        .small.button {
          --size: 1.5rem;
          &:nth-of-type(1) {
            background-color: var(--button2-color);
          }
          &:nth-of-type(2) {
            background-color: var(--button3-color);
          }
          &:nth-of-type(3) {
            background-color: var(--button4-color);
          }
        }
        .loading-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10%;
          margin: auto;
        }
        .loading-pokeball {
          width: 8rem;
          animation: spin 1s linear infinite;
        }
        .loading-text {
          font-size: 4rem;
        }
        .loading-text span {
          visibility: hidden;
          animation: loading-dots 3s linear infinite;
          &:nth-of-type(1) {
            --visibility1: visible;
            --visibility2: visible;
            --visibility3: visible;
          }
          &:nth-of-type(2) {
            --visibility1: hidden;
            --visibility2: visible;
            --visibility3: visible;
          }
          &:nth-of-type(3) {
            --visibility1: hidden;
            --visibility2: hidden;
            --visibility3: visible;
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes loading-dots {
          24% {
            visibility: hidden;
          }
          25% {
            visibility: var(--visibility1);
          }
          49% {
            visibility: var(--visibility1);
          }
          50% {
            visibility: var(--visibility2);
          }
          74% {
            visibility: var(--visibility2);
          }
          75% {
            visibility: var(--visibility3);
          }
        }
      </style>
      <div class="loading-screen active">
        <div class="pokedex">
          <header class="pokedex-header">
            <div class="pokedex-buttons">
              <div class="big button"></div>
              <div class="small-buttons">
                <div class="small button"></div>
                <div class="small button"></div>
                <div class="small button"></div>
              </div>
            </div>
          </header>
          <div class="loading-container">
            <img class="loading-pokeball" src="img/pokeball.svg">
            <h3 class="loading-text">Loading<span>.</span><span>.</span><span>.</span></h3>
          </div>
        </div>
      </div>
      `
    }
    hide() {
      this.shadow.querySelector('.loading-screen').classList.remove('active')
    }
  }
  
  customElements.define('loading-screen-component', LoadingScreen);