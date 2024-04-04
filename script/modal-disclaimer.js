class ModalDisclaimer extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback () {
      document.addEventListener('openDisclaimer', (event) => {
        this.activateModal()
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          --container-color: rgb(238, 64, 53);
          --bottom-color: rgb(236, 236, 236);
        }
        * {
          margin: 0;
          padding: 0;
        }
        .modal-background {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          z-index: 400;
        }
        .modal-background:has( .active) {
          display: block;
        }
        .modal {
          width: 60vw;
          height: 30vh;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          margin: auto;
          background-color: rgb(68, 68, 68);
          border: 0.25rem solid rgb(122, 122, 122);
          border-radius: 1rem;
          box-shadow: 0.5rem 0.5rem 0 0 rgb(0,0,0,0.2);
          z-index: 500;
        }
        .modal.active {
          animation: grow 0.5s ease-in forwards;
        }
        .modal-header {
          position: relative;
          background: var(--container-color) linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%);
          text-align: center;
          & h3 {
            margin: 1% 0;
          }
        }
        .close-button {
          position: absolute;
          top: 10%;
          right: 2%;
          font-family: arial, helvetica, sans-serif;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          &:hover {
            filter: brightness(1.1);
            transform: scale(1.1);
          }
        }
        .white-part {
          height: 1rem;
          background: var(--bottom-color) linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0, 0, 0, 0.2) 80%, rgba(0,0,0,0.2) 100%);
          border-radius: 50rem;
          transform: translateY(50%)
        }
        .modal-main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 3%;
          text-align: justify;
        }

        @keyframes grow {
          0% {
            transform: scale(0);
          }
          90% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      </style>
      <div class="modal-background">
        <div class="modal">
          <header class="modal-header">
            <h3>Disclaimer</h3>
            <p class="close-button">x</p>
            <div class="white-part"></div>
          </header>
          <main class="modal-main">
            <p class="modal-content">The author of this page is not affiliated with Nintendo and does not own or claim any rights to any Nintendo trademark or the Pokémon trademark, and all references to such are used for commentary and informational purposes only.</p>
          </main>
        </div>
      </div>
      `
      this.shadow.addEventListener('click', (event) => {
        if (event.target.closest('.close-button') || !event.target.closest('.modal')) {
          const modal = this.shadow.querySelector('.modal')
          modal.classList.remove('active')
        }
      })
    }
    activateModal() {
      const modal = this.shadow.querySelector('.modal')
      modal.classList.add('active')
    }
  }
  
  customElements.define('modal-disclaimer-component', ModalDisclaimer);