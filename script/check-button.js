class CheckButton extends HTMLElement {

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
          --button-size: 15rem;
          --animation-details: 1s ease-in-out forwards;
        }
        .button-container {
          width: 25rem;
          display: flex;
          justify-content: center;
          overflow: hidden;
          padding: 1%;
        }
        .pokeball-button {
          display: flex;
          justify-content: center;
          align-items: stretch;
          cursor: pointer;
        }
        .pokeball-button:hover {
          transform: scale(1.05);
        }
        .pokeball-button:has(:disabled) {
          animation: var(--animation-details);
          animation-name: button-rotate;
        }
        .check-button {
          width: var(--button-size);
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgb(185, 185, 185) linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);
          color: inherit;
          border: 5px solid rgb(88, 88, 90);
          border-radius: 1rem;
          cursor: pointer;
          font: inherit;
          font-size: 1.5rem;
        }
        .check-button:disabled {
          overflow: hidden;
          animation: var(--animation-details);
          animation-name: button-close;
        }
        .upper-half {
          transform: translateX(50%);
        }
        .lower-half {
          transform: translateX(-50%);
        }
        @keyframes button-close {
          0% {
            width: var(--button-size);
          }
          50% {
            width: 2.5rem;
          }
          100% {
            width: 2.5rem;
          }
        }
        @keyframes button-rotate {
          0% {
            transform: rotate(0);
          }
          50% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(90deg);    
          }
        }
      </style>
      <div class="button-container">
        <div class="pokeball-button">
          <img class="upper-half" src="img/pokeball-upper-part.svg">
          <button class="check-button">Check</button>
          <img class="lower-half" src="img/pokeball-lower-part.svg">
        </div>
      </div>
      `
      const button = this.shadow.querySelector('.pokeball-button')
      button.addEventListener('click', ()=> {
        button.querySelector('button').disabled = true;
      })
    }
  }
  
  customElements.define('check-button-component', CheckButton);