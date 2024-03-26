class Scores extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.score = 0
      if (isNaN(localStorage.getItem("bestScore"))) {
        localStorage.setItem("bestScore", 0)
      }
      
    }
  
    connectedCallback () {
      document.addEventListener('win', (event) => {
        this.addPoint()
      })
      document.addEventListener('lose', (event) => {
        this.resetPoints()
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0; 
        }
        .scores {
          width: 25rem;
          display: flex;
          justify-content: flex-start;
          gap: 3%;
          padding: 0 3%;
        }
        .score {
          min-width: 30%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 5%;
          padding: 2%;
          background-color: #7a7a7a;
          border-radius: 1rem 1rem 0 0;
          font-size: 1.25rem;
        }
        .score.best {
          justify-content: space-between;
        }
        .star {
          width: 1.5rem;
          & * {
            fill: gold;
          }
        }
        .best-score {
          color: gold;
        }
      </style>
      <div class="scores">
        <div class=" score current" title="Score">
          <p class="current-score">${this.score}</p>
        </div>
        <div class=" score best" title="High score">
          <svg class="star" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.2257 34.5491H97.5528L68.1636 55.9017L79.3893 90.4509L50 69.0983L20.6107 90.4509L31.8364 55.9017L2.44717 34.5491H38.7743L50 0Z" fill="#C4C411"/>
          </svg>
          <p class="best-score">${0 || localStorage.getItem("bestScore")}</p>
        </div>
      </div>
      `
    }
    addPoint() {
      this.score++
      if (this.score > localStorage.getItem("bestScore")) {
        localStorage.setItem("bestScore", this.score);
      }
      this.render()
    }
    resetPoints() {
      this.score = 0
      this.render()
    }
  }
  
  customElements.define('scores-component', Scores);