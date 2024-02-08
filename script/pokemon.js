class Pokemon extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.callList
      this.pokemonName
      this.pokemonImage
      this.typeOne
      this.typeTwo
      this.difficulty = 'normal'
    }
  
    connectedCallback () {
      document.addEventListener('loaded', (event) => {
        this.callList = event.detail.callList
        this.loadInfo()
      })
      document.addEventListener('checkTypes', (event) => {
        this.checkTypes(event.detail.typeOne, event.detail.typeTwo)
      })
      document.addEventListener('loose', (event) => {
        this.showCrosssTick(false)
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          --white: rgb(224, 224, 224);
          --border: 0.3rem solid rgb(178, 177, 178);
          --size: 25rem;
          /*width: 25rem;*/
        }
        * {
          margin: 0;
          padding: 0;
        }
        .pokemon-name {
          width: var(--size);
          padding: 2% 0;
          background: rgb(238, 64, 53) linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%);
          border: var(--border);
          border-radius: 1rem 1rem 0 0;
          box-shadow: 0.5rem 0.5rem 0 0 rgba(0,0,0,0.1);
          font-size: 1.5rem;
          text-align: center;
          text-transform: capitalize;
        }
        .image-container {
          box-shadow: 0.5rem 0.5rem 0 0 rgba(0,0,0,0.1);
          width: var(--size);
          height: var(--size);
          position: relative;
          background-color: var(--white);
          border: var(--border);
          border-top: 0;
          border-radius: 0 0 1rem 1rem;
        }
        .pokemon-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cross-tick {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          visibility: hidden;
          margin: auto;
        }
        .cross-tick.active {
          visibility: visible;
          animation: pulsate 1s ease-out forwards;
        }
        @keyframes pulsate {
          0% {
            opacity: 0;
            transform: scale(0.2)
          }
          50% {
            opacity: 1;
            transform: scale(1.1)
          }
          100% {
            transform: scale(1)
          }
        }
      </style>
      <div class="pokemon">
        <h2 class="pokemon-name">${this.pokemonName}</h2>
        <div class="image-container">
        <img class="pokemon-image" src="${this.pokemonImage ? this.pokemonImage:'img/pokeball-negative.svg'}" alt="${this.pokemonName}" title="${this.pokemonName}">
        <img class="cross-tick" src="img/tick.svg">
        </div>
      </div>
      `
    }
    loadInfo() {
      // this.callList = ['https://pokeapi.co/api/v2/pokemon/gengar','https://pokeapi.co/api/v2/pokemon/ditto']
      let random = Math.floor(Math.random() * this.callList.length);
      // random = 1153
      let apiUrl = this.callList[random]
      fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(pokemonData => {
        this.pokemonName = pokemonData.forms[0].name.replaceAll('-',' ')
        this.typeOne = pokemonData.types[0].type.name
        if (pokemonData.types[1]) {
          this.typeTwo = pokemonData.types[1].type.name
        } else {
          this.typeTwo = null
        }
        this.pokemonImage = pokemonData.sprites.other['official-artwork'].front_default
        this.render()
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    checkTypes(typeOne,typeTwo) {
      console.log(`selected types: type1: ${typeOne}, type2: ${typeTwo} -- real types: type1: ${this.typeOne}, type2: ${this.typeTwo}`)
      if (this.difficulty == 'easy') {
        
      } else if (this.difficulty == 'normal') {
        if (typeOne == this.typeOne || typeTwo == this.typeOne) {
          if (typeOne == this.typeTwo || typeTwo == this.typeTwo) {
            // alert('muy bien')
            this.showCrosssTick(true)
            // this.loadInfo()
          } else {
            // alert('no es correcto')
            this.wrongAnswer()
          }
        } else {
          // alert('no es correcto')
          this.wrongAnswer()
        }
      } else if (this.difficulty == 'difficult') {
        
      }
    }
    showCrosssTick(showTick) {
      const crossTick = this.shadow.querySelector('.cross-tick')
      if (showTick) {
        crossTick.src = 'img/tick.svg'
      } else {
        crossTick.src = 'img/cross.svg'
      }
      crossTick.classList.add('active')
      setTimeout(() => {
        crossTick.classList.remove('active')
        this.loadInfo()
        document.dispatchEvent(new CustomEvent('reset'))
      }, 1000)
    }
    wrongAnswer() {
      document.dispatchEvent(new CustomEvent('wrongAnswer', {
        detail: {
          difficulty: this.difficulty,
          typeOne: this.typeOne,
          typeTwo: this.typeTwo
        }
      }))
    }
  }
  
  customElements.define('pokemon-component', Pokemon);