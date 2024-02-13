class CheckButton extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.typeOne = null
      this.typeTwo = null
    }
  
    connectedCallback () {
      document.addEventListener('updateType', (event) => {
        if (event.detail.typeNumber == 1) {
          this.typeOne = event.detail.type
        } else if (event.detail.typeNumber == 2) {
          this.typeTwo = event.detail.type
        }
      })
      document.addEventListener('loose', (event) => {
        const button = this.shadow.querySelector('.check-button')
        button.disabled = true
      })
      document.addEventListener('reset', (event) => {
        const button = this.shadow.querySelector('.check-button')
        button.disabled = false
      })
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
          <img class="upper-half" src="img/pokeball-upper-part.svg" draggable="false">
          <button class="check-button">Check</button>
          <img class="lower-half" src="img/pokeball-lower-part.svg" draggable="false">
        </div>
      </div>
      `
      const button = this.shadow.querySelector('.check-button')
      button.addEventListener('click', ()=> {
        // button.disabled = true;
        document.dispatchEvent(new CustomEvent('checkTypes', {
          detail: {
            typeOne: this.typeOne,
            typeTwo: this.typeTwo,
          }
        }))
      })
    }
  }
  
  customElements.define('check-button-component', CheckButton);