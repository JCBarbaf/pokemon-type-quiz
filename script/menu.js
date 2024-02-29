class Menu extends HTMLElement {

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
        :host {
          --pokedex-color: rgb(255, 51, 52);
          --pokedex-border: 0.5rem solid rgb(180, 41, 42);
          --pokedex-bc1: rgb(123, 176, 208);
          --pokedex-bc2: rgb(113, 161, 189);
          --pokedex-btn1-color: rgb(51, 218, 255);
          --pokedex-btn2-color: rgb(251, 5, 5);
          --pokedex-btn3-color: rgb(252, 255, 22);
          --pokedex-btn4-color: rgb(105, 251, 34);
          --button-color: rgb(179, 179, 179);
          --explanation-bc: rgb(122, 122, 122);
          --border: 0.2rem solid rgb(0,0,0,0.2);;
          width: 40rem;
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          overflow-x: hidden;
          z-index: 300;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            color: inherit;
        }
        .menu-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
        }
        .menu-button {
          --size: 3.5rem;
          width: var(--size);
          height: var(--size);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          background-color: var(--button-color);
          border: var(--border);
          border-radius: 50rem;
          box-shadow: 0.2rem 0.2rem 0 0 rgb(0,0,0,0.2);
        }
        .menu-icon {
          width: 1.5rem;
          opacity: 0.2;
        }
        .menu {
          width: 85%;
          height: 98%;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: auto 0;
          background-color: var(--pokedex-color);
          border: var(--pokedex-border);
          border-right: none;
          border-radius: 2rem 0 0 2rem;
          box-shadow: 0.5rem 0.5rem 0 0 rgb(0,0,0,0.2);
        }
        .pokedex-header {
          width: 100%;
          position: absolute;
          top: 1.35rem;
          left: 1.55rem;
          display: flex;
        }
        .pokedex-buttons {
          box-sizing: border-box;
          width: 50%;
          display: flex;
          background-color: var(--pokedex-color);
          border-bottom: var(--pokedex-border);
          border-right: var(--pokedex-border);
          border-radius: 1rem 0;
        }
        .button {
          width: var(--size);
          height: var(--size);
          background-color: var(--pokedex-btn1-color);
          border: var(--pokedex-border);
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
            background-color: var(--pokedex-btn2-color);
          }
          &:nth-of-type(2) {
            background-color: var(--pokedex-btn3-color);
          }
          &:nth-of-type(3) {
            background-color: var(--pokedex-btn4-color);
          }
        }
        .menu-content {
          width: 95%;
          height: 95%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5%;
          padding: 1%;
          padding-top: 10rem;
          background: repeating-linear-gradient(var(--pokedex-bc1) 0%, var(--pokedex-bc1) 3%, var(--pokedex-bc2) 4%, var(--pokedex-bc2) 6%, var(--pokedex-bc1) 7%);
          border: var(--pokedex-border);
          border-right: none;
          border-radius: 1rem 0 0 1rem;
        }
        .difficulty-container {
          width: 90%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
          position: relative;
        }
        .difficulty {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .difficulty-button {
          min-width: 25%;
          position: relative;
          padding: 2%;
          background-color: var(--button-color);
          color: var(--black, black);
          border: var(--border);
          border-radius: 0.5rem;
          font: inherit;
          font-size: 0.9rem;
        }
        .difficulty-button.selected {
          background-color: var(--pokedex-color);
          color: var(--white, white);
        }
        .difficulty-button:not(.selected):hover {
          transform: scale(1.1);
          filter: brightness(1.1);
          cursor: pointer;
        }
        .difficulty-button:hover::after {
          content: "";
          width: 0;
          position: absolute;
          bottom: -1.6rem;
          left: 0;
          right: 0;
          margin: auto;
          border: 1rem solid;
          border-color: transparent transparent var(--explanation-bc) transparent;
          filter: brightness(0.9);
        }
        .difficulty-button.selected:hover::after {
          filter: none;
        }
        .explanations {
          height: 15vh;
          position: absolute;
          top: 4.2rem;
          left: 0;
          right: 0;
          pointer-events: none;
        }
        .explanation {
          height: auto;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          justify-content: center;
          align-items: center;
          padding: 3%;
          background-color: var(--explanation-bc);
          border-radius: 1rem;
          text-align: justify;
        }
        .difficulty-container:has(.difficulty-button.easy:hover) .explanation.easy {
          display: flex;
        }
        .difficulty-container:has(.difficulty-button.normal:hover) .explanation.normal {
          display: flex;
        }
        .difficulty-container:has(.difficulty-button.hard:hover) .explanation.hard {
          display: flex;
        }
        .live-selector {
          display: flex;
          gap: 2%;
          font-size: 1.2rem;
        }
        .lifes-button {
          width: 2.5rem;
          background-color: var(--pokedex-color);
          border: var(--border);
          border-radius: 0.3rem;
          font-weight: bold;
          font-size: 1.5rem;
          cursor: pointer;
          &:hover {
            filter: brightness(1.1);
          }
        }
        .life-display {
          width: 2.5rem;
          background-color: var(--white,white);
          color: var(--black, black);
          border: var(--border);
          font: inherit;
          text-align: center;
          &:focus {
            outline: none;
          }
        }
        .menu-item {
          width: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5%;
          padding: 2%;
          background-color: var(--pokedex-color);
          color: var(--white, white);
          border: var(--border);
          border-radius: 50rem;
          font: inherit;
          font-weight: bold;
          text-decoration: none;
          cursor: pointer;
          &:hover {
            transform: scale(1.1);
            filter: brightness(1.1);
          }
        }
        .menu-item-icon {
          width: 1.5rem;
        }
        .menu-item-icon * {
          fill: var(--white, white);
        }
      </style>
      <div class="menu-container">
        <div class="button-container">
          <button class="menu-button">
            <svg class="menu-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.95402 52.8861C3.34866 51.3812 3.34866 47.6188 5.95403 46.1139L83.1379 1.52967C85.7433 0.0247193 89 1.90591 89 4.91581V94.0842C89 97.0941 85.7433 98.9753 83.1379 97.4703L5.95402 52.8861Z" fill="black"/>
            </svg>           
          </button>
        </div>
        <div class="menu">
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
          <main class="menu-content">
            <div class="difficulty-container">
              <div class="difficulty">
                <button class="difficulty-button easy" data-difficulty="easy">Easy</button>
                <button class="difficulty-button normal selected" data-difficulty="normal">Normal</button>
                <button class="difficulty-button hard" data-difficulty="hard">Hard</button>
              </div>
              <div class="explanations">
                <p class="explanation easy">On easy mode, if a Pokémon has only one type, only one type container will be shown.</p>
                <p class="explanation normal">On normal mode, if a Pokémon has only one type, you have to leave the second type container empty.</p>
                <p class="explanation hard">On hard mode, you have to guess the types in the correct order.</p>
              </div>
            </div>
            <div class="live-selector">
              <p>Lifes:</p>
              <button class="lifes-button down">-</button>
              <p class="life-display">3</p>
              <button class="lifes-button up">+</button>
            </div>
            <button class="menu-item">
              <svg class="menu-item-icon achivements-icon" viewBox="0 0 317 313" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M259.269 55.5268C262.785 31.3123 263.932 12.2071 261.368 8.06457C254.868 -2.43695 60.8683 -2.93654 55.368 8.06461C53.204 12.3929 54.4226 31.4515 57.8734 55.5549C36.4588 53.9491 13.9695 58.8915 4.86823 71.563C-10.2744 92.6459 12.7153 141.794 35.3681 158.064C49.9808 168.559 73.9773 180.945 93.2353 182.755C105.984 205.539 121.003 221.232 137 228.66V255.232C121.588 257.703 107.36 262.854 95.9454 270.247C79.4524 280.93 64.6368 307.873 70.1867 310.526C75.7365 313.179 241.382 313.305 246.078 310.526C250.775 307.747 236.813 280.93 220.32 270.247C208.84 262.812 194.514 257.644 179 255.19V228.995C195.272 221.711 210.556 205.889 223.499 182.758C242.761 180.955 266.771 168.564 281.39 158.064C304.043 141.794 327.032 92.6459 311.89 71.563C302.843 58.9674 280.568 54.0086 259.269 55.5268ZM238.13 149.493C244.161 131.384 249.701 108.519 253.992 86.4461C266.162 83.9484 278.896 84.6113 283.889 91.563C292.315 103.294 279.994 123.01 267.389 132.063C260.037 137.344 248.304 145.741 238.13 149.493ZM78.6401 149.498C72.6662 131.395 67.2527 108.557 63.0552 86.5062C50.7981 83.9383 37.9012 84.556 32.8685 91.563C24.4426 103.294 36.7637 123.01 49.3685 132.063C56.724 137.346 68.4635 145.748 78.6401 149.498Z" fill="#D9D9D9"/>
              </svg>
              Achievements
            </button>
            <button class="menu-item">Disclaimer</button>
            <a class="menu-item" href="">Buy me a coffe</a>
          </main>
        </div>
      </div>
      `
    }
  }
  
  customElements.define('menu-component', Menu);