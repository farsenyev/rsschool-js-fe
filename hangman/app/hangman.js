import Gallow from './Gallow.js';
import QaModule from "./qaModule.js";
import Keyboard from "./keyboard.js";

class Hangman {
    constructor(parent,data) {
        this.data = data;
        this.parent = parent;
        this.container = null;
        this.gallow = null;
        this.qa = null;
        this.keyboard = null;
        this.state = {
            lastQuestIndex: '',
            answer: '',
            incorrectCounter: 0
        }

        this.init()
    }

    init(){
        this.container = document.createElement('main');
        this.container.classList.add('main__container')

        this.gallow = new Gallow(this.state)
        this.qa = new QaModule(this.data, this.state)
        this.keyboard = new Keyboard(this.state)

        this.container.append(this.gallow.getHtml())
        this.container.append(this.qa.getHTML())
        this.container.append(this.keyboard.getHTML())
        this.parent.append(this.container)

        document.addEventListener('keyup', (event) => {this.clickHandler(event)})
        document.addEventListener('gameEnd', (event) => {this.gameEnd(event.detail)})
    }

    clickHandler(event){
        const key = event.key

        const remove = new CustomEvent('removeButton', {detail: key})
        document.dispatchEvent(remove)

        if (!this.state.answer.includes(key)){
            const event = new Event('wrong')
            document.dispatchEvent(event)
        }else{
            const event = new CustomEvent('correct', {detail: key})
            document.dispatchEvent(event)
        }

    }

    gameEnd(status){
        const modal = document.createElement('section');
        modal.classList.add('main__modal');

        const modalOverlay = document.createElement('section');
        modalOverlay.classList.add('main__modal-overlay');

        const buttonGE = document.createElement('button');
        buttonGE.classList.add('main__modal__button-ge');
        buttonGE .innerHTML = 'New Game'
        buttonGE.addEventListener('click', () => {location.reload()})

        const answ = document.createElement('h3');
        answ.classList.add('main__modal__anaw');
        answ.innerHTML = this.state.answer;

        const msg = document.createElement('h2');
        msg.classList.add('main__modal__msg');
        switch (status) {
            case 0:
                msg.innerHTML = 'Oh, sorry! You lose. Try again!'
                break;
            case 1:
                msg.innerHTML = 'Congratulation! You win. Try more!'
                break;
        }

        modal.append(msg, answ, buttonGE)
        modalOverlay.append(modal)
        document.body.classList.add('show-modal')
        document.body.append(modalOverlay)
    }
}

export default Hangman