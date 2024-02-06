class Lives extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback () {
      document.addEventListener('wrongAnswer', (event) => {
        this.loseLife()
      })
      document.addEventListener('reset', (event) => {
        this.resetLives()
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          flex: 1;
        }
        .lives {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5%;
        }
        .life {
          --size: 2rem;
          width: var(--size);
          height: var(--size);
        }
        .life.lost {
          animation: disappear 1s ease-out forwards;
        }
        @keyframes disappear {
          0% {
            transform: rotate(0deg) scale(1);
          }
          10% {
            transform: rotate(0deg) scale(1.5);
          }
          99% {
            transform: rotate(720deg) scale(0);
            display: block;
          }
          100% {
            display: none;
          }
        }
      </style>
      <div class="lives">
        <img class="life" src="img/pokeball.svg" alt="Life" ives="Life">
        <img class="life" src="img/pokeball.svg" alt="Life" ives="Life">
        <img class="life" src="img/pokeball.svg" alt="Life" ives="Life">
      </div>
      `
    }
    loseLife() {
      let lives = this.shadow.querySelectorAll('.life:not(.lost)')
      lives[lives.length-1].classList.add('lost')
      if (lives.length == 1) {
        // console.log('sacabo')
        document.dispatchEvent(new CustomEvent('loose'))
      }
      // console.log(lives)
      // lives.pop()
    }
    resetLives() {
      let lives = this.shadow.querySelectorAll('.life')
      lives.forEach((life) => {
        life.classList.remove('lost')
      })
    }
  }
  
  customElements.define('lives-component', Lives);