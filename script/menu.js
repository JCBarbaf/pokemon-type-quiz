class Menu extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.difficulty = 'normal'
      this.lifes = 3
      this.maxlifes = 6
      this.hasChanges = false
      this.oldDifficulty = this.difficulty
      this.oldLifes = this.lifes
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
          --border: 0.2rem solid rgb(0,0,0,0.2);
          --transition: 0.5s ease-in;
          width: 40rem;
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          overflow-x: hidden;
          pointer-events: none;
          z-index: 300;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            color: inherit;
        }
        .blocker {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          opacity: 0;
          background-color: rgb(0,0,0,0.5);
          pointer-events: none;
          transition: opacity 0.1s ease-in;
          z-index: 100;
        }
        .menu-container.active .blocker {
          opacity: 1;
          pointer-events: all;
        }
        .menu-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          position: absolute;
          right: -85%;
          transition: var(--transition);
          transition-property: right;
          pointer-events: all;
        }
        .menu-container.active {
          right: 0;
        }
        .button-container {
          z-index: 200;
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
          cursor: pointer;
        }
        .menu-button:hover {
          filter: brightness(1.1)
        }
        .menu-icon {
          width: 1.5rem;
          opacity: 0.2;
          transform: rotate(0deg);
          transition: var(--transition);
          transition-property: transform;
        }
        .active .menu-icon {
          transform: rotate(-180deg);
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
          z-index: 200;
        }
        .menu.blocked {
          filter: brightness(0.9);
          pointer-events: none;
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
      <div class="blocker"></div>
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
                <button class="difficulty-button normal" data-difficulty="normal">Normal</button>
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
              <p class="life-display">${this.lifes}</p>
              <button class="lifes-button up">+</button>
            </div>
            <button class="menu-item disclaimer">Disclaimer</button>
          </main>
        </div>
      </div>
      `
      this.shadow.querySelector(`.difficulty-button.${this.difficulty}`).classList.add('selected')
      const menuContainer = this.shadow.querySelector('.menu-container')
      menuContainer.addEventListener('click', (event) => {
        if (event.target.closest('.menu-button')) {
          if (menuContainer.classList.contains('active')) {
            if (this.oldDifficulty != this.difficulty || this.oldLifes != this.lifes) {
              this.oldDifficulty = this.difficulty
              this.oldLifes = this.lifes
              document.dispatchEvent(new CustomEvent('lose'))
              this.hasChanges = false
            }
          }
          menuContainer.classList.toggle('active')
        }
        if (event.target.closest('.lifes-button')) {
          if (event.target.closest('.down')) {
            if (this.lifes > 1) {
              this.lifes--
            }
          } else if (event.target.closest('.up')) {
            if(this.lifes < this.maxlifes) {
              this.lifes++
            }
          }
          this.shadow.querySelector('.life-display').innerHTML = this.lifes
          document.dispatchEvent(new CustomEvent('changeLifes', {
            detail: {
              lifes: this.lifes
            }
          }))
          this.hasChanges = true
        }
        if (event.target.closest('.difficulty-button')) {
          event.target.parentNode.querySelector('.selected').classList.remove('selected')
          event.target.classList.add('selected')
          this.difficulty = event.target.dataset.difficulty
          document.dispatchEvent(new CustomEvent('changeDifficulty', {
            detail: {
              difficulty: this.difficulty
            }
          }))
          this.hasChanges = true
        }
        if (event.target.closest('.disclaimer')) {
          document.dispatchEvent(new CustomEvent('openDisclaimer'))
        }
        if (this.difficulty == 'hard' && this.lifes == 1) {
          document.dispatchEvent(new CustomEvent('changeDifficulty', {
            detail: {
              difficulty: 'master'
            }
          }))
        } else {
          document.dispatchEvent(new CustomEvent('changeDifficulty', {
            detail: {
              difficulty: this.difficulty
            }
          }))
        }
      })
    }
  }
  
  customElements.define('menu-component', Menu);