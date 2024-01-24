class Pokemon extends HTMLElement {

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
          --white: rgb(224, 224, 224);
          --border: 0.3rem solid rgb(178, 177, 178);
          /*width: 25rem;*/
        }
        * {
          margin: 0;
          padding: 0;
        }
        .pokemon-name {
          padding: 1%;
          background: rgb(238, 64, 53) linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%);
          border: var(--border);
          border-radius: 1rem 1rem 0 0;
          text-align: center;
          box-shadow: 0.5rem 0.5rem 0 0 rgba(0,0,0,0.1);
        }
        .pokemon-image {
          box-shadow: 0.5rem 0.5rem 0 0 rgba(0,0,0,0.1);
          --size: 25rem;
          width: var(--size);
          height: var(--size);
          background-color: var(--white);
          border: var(--border);
          border-top: 0;
          border-radius: 0 0 1rem 1rem;
          object-fit: cover;
        }
      </style>
      <div class="pokemon">
        <h2 class="pokemon-name">Gengar</h2>
        <img class="pokemon-image" src="img/pokemon/gengar.png" alt="Gengar" title="Gengar">
      </div>
      `
    }
  }
  
  customElements.define('pokemon-component', Pokemon);