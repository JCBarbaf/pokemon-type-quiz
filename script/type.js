class Type extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.type = this.getAttribute('type');
      this.typeColor = this.getAttribute('type-color');
      this.typeNumber = this.getAttribute('type-number');
      this.forceWrong = false
    }
  
    connectedCallback () {
      document.addEventListener('updateType', (event) => {
        this.render()
      })
      document.addEventListener('reset', (event) => {
        this.forceWrong = false
      })
      document.addEventListener('wrongAnswer', (event) => {
        if (this.typeNumber) {
          this.clue(event.detail.difficulty, event.detail.typeOne, event.detail.typeTwo)
          this.forceWrong = false
        }
      })
      document.addEventListener('sameTypes', (event) => {
        if (event.detail.type == null) {
          if (this.typeNumber == 1) {
            this.forceWrong = true
          }
        } else {
          if (this.typeNumber == 2) {
            this.forceWrong = true
          }
        }
      })
      document.addEventListener('revealTypes', (event) => {
        if (this.typeNumber == 1) {
          this.type = event.detail.typeOne
        }
        if (this.typeNumber == 2) {
          this.type = event.detail.typeTwo
        }
        this.render()
      })
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          --normal-color: rgb(144, 153, 161);
          --fire-color: rgb(255, 156, 84);
          --water-color: rgb(77, 144, 213);
          --grass-color: rgb(99, 187, 91);
          --electric-color: rgb(243, 210, 59);
          --ice-color: rgb(116, 206, 192);
          --fighting-color: rgb(206, 64, 105);
          --poison-color: rgb(171, 106, 200);
          --ground-color: rgb(217, 119, 70);
          --flying-color: rgb(0, 135, 255);
          --psychic-color: rgb(249, 113, 118);
          --bug-color: rgb(144, 193, 44);
          --rock-color: rgb(199, 183, 139);
          --ghost-color: rgb(82, 105, 172);
          --dragon-color: rgb(10, 109, 196);
          --dark-color: rgb(90, 83, 102);
          --steel-color: rgb(90, 142, 161);
          --fairy-color: rgb(236, 143, 230);
          --grey-color: rgb(122, 122, 122);
          --green: rgb(12,150,0);
          --red: rgb(203,41,41);
          --yellow: rgb(255,255,0);
        }
        .type {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .type-container {
          display: block;
          --size: 8rem;
          width: var(--size);
          height: var(--size);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--${this.type ? this.type : 'grey'}-color);
          border: 0.4rem solid rgb(0,0,0,0.2);
          border-radius: 50%;
          box-shadow: 0.3rem 0.3rem 0 0 rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .type-container img {
          --size: 90%;
          width: var(--size);
          height: var(--size);
        }
        .type-container:has(img):hover {
          transform: scale(1.05);
        }
        .type-name {
          text-align: center;
          text-transform: capitalize;
        }
        .wrong {
          border-color: var(--red)
        }
        .correct {
          border-color: var(--green)
        }
        .not-order {
          border-color: var(--yellow)
        }
        .unselectable {
          user-select: none;
        }
      </style>
      <div class="type">
        <div class="type-container"></div>
        <p class="type-name">${this.type ?? 'none'}</p>
      </div>
      `
      const typeContainer = this.shadow.querySelector('.type-container')
      if (this.type) {
        typeContainer.draggable =  true
        let typeIcon = document.createElement('img')
        typeIcon.src = `img/type_icons/${this.type}_type.svg`
        typeIcon.alt = this.type
        typeIcon.alt = this.type
        typeIcon.draggable =  false
        typeContainer.appendChild(typeIcon)
      }
      typeContainer.addEventListener('dragstart', (event) => {
        const dataObject = {
          type: this.type,
          typeNumber: this.typeNumber
        };
        event.dataTransfer.setData("application/json", JSON.stringify(dataObject));
      })
    }
    clue(difficulty, typeOne, typeTwo) {
      if (difficulty == 'normal' || difficulty == 'easy') {
        if (typeOne == this.type || typeTwo == this.type) {
          this.addClass('correct')
        } else {
          this.addClass('wrong')
        }
      } else if (difficulty == 'hard') {
        if ((typeOne == this.type && this.typeNumber == 1) || (typeTwo == this.type && this.typeNumber == 2)) {
          this.addClass('correct')
        } else {
          if ((typeOne == this.type && this.typeNumber == 2) || (typeTwo == this.type && this.typeNumber == 1)) {
            this.addClass('not-order')
          } else {
            this.addClass('wrong')
          }
        }
      }
      if (this.forceWrong) {
        this.addClass('wrong')
      }
    }
    addClass(selectedClass) {
      const typeContainer =this.shadow.querySelector('.type-container')
      typeContainer.classList.remove('wrong')
      typeContainer.classList.remove('correct')
      typeContainer.classList.remove('not-order')
      typeContainer.classList.add(selectedClass)
    }
  }
  
  customElements.define('type-component', Type);