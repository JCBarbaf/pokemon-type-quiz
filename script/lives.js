class Lives extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.maxLifes = 3
      this.lifes = this.maxLifes
    }
  
    connectedCallback () {
      document.addEventListener('wrongAnswer', (event) => {
        this.loseLife()
      })
      document.addEventListener('reset', (event) => {
        this.resetLives()
      })
      document.addEventListener('changeLifes', (event) => {
        if (this.lifes = this.maxLifes) {
          this.maxLifes = event.detail.lifes
          this.render()
        }
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          flex: 1;
          background-color: red;
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
      <div class="lives"></div>
      `
      const livesContainer = this.shadow.querySelector('.lives')
      for (let i = 0; i < this.maxLifes; i++) {
        let life = document.createElement('img')
        life.classList.add('life')
        life.src = 'img/pokeball.svg' 
        life.alt = 'Life'
        life.title = 'Life'
        life.draggable = false
        livesContainer.appendChild(life)
      }
    }
    loseLife() {
      this.lifes--
      let lives = this.shadow.querySelectorAll('.life:not(.lost)')
      lives[lives.length-1].classList.add('lost')
      if (lives.length == 1) {
        document.dispatchEvent(new CustomEvent('loose'))
      }
    }
    resetLives() {
      let lives = this.shadow.querySelectorAll('.life')
      lives.forEach((life) => {
        life.classList.remove('lost')
      })
    }
  }
  
  customElements.define('lives-component', Lives);