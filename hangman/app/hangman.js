import Gallow from './Gallow.js';
import QaModule from "./qaModule.js";
import Keyboard from "./keyboard.js";

class Hangman {
    constructor(parent, data) {
        this.data = data;
        this.parent = parent;
        this.keys = [];
        this.container = null;
        this.gallow = null;
        this.qa = null;
        this.keyboard = null;
        this.imgCon = null;
        this.state = {
            lastQuestIndex: '',
            answer: '',
            incorrectCounter: 0,
            correctCounter: 0
        }

        this.init();
    }

    init(){
        this.container = document.createElement('main');
        this.container.classList.add('main__container');


        document.addEventListener('gameEnd', (event) => {this.gameEnd(event.detail)});
        document.addEventListener('wrong', () => {this.wrongHandler()});
        document.addEventListener('drawMan', () => {this.draw()});
        document.addEventListener('correct', (event) => {this.showLetter(event)});
        document.addEventListener('removeButton', (event) => {this.disableButton(event.detail)});

        this.start()
    }

    wrongHandler(){
        this.state.incorrectCounter ++;
        const event = new Event('drawMan')
        document.dispatchEvent(event)
        document.querySelectorAll('.qa__counter')[0].innerHTML = `${this.state.incorrectCounter}/6`;
        if (this.state.incorrectCounter >= 6){
            // document.removeEventListener('keyup', ()=>{})
            const event = new CustomEvent('gameEnd', {detail: 0});
            document.dispatchEvent(event);
        }
    }

    draw(){
        switch (this.state.incorrectCounter){
            case 1:
                const img = document.createElement('img');
                img.classList.add('img__head');
                img.src = '../assets/head.svg';
                this.imgCon.append(img)
                break;
            case 2:
                const img2 = document.createElement('img');
                img2.classList.add('img__body');
                img2.src = '../assets/body.svg';
                this.imgCon.append(img2)
                break;
            case 3:
                const img3 = document.createElement('img');
                img3.classList.add('img__hand-one');
                img3.src = '../assets/hand-one.svg';
                this.imgCon.append(img3)
                break;
            case 4:
                const img4 = document.createElement('img');
                img4.classList.add('img__hand-two');
                img4.src = '../assets/hand-two.svg';
                this.imgCon.append(img4)
                break;
            case 5:
                const img5 = document.createElement('img');
                img5.classList.add('img__leg-one');
                img5.src = '../assets/leg-one.svg';
                this.imgCon.append(img5)
                break;
            case 6:
                const img6 = document.createElement('img');
                img6.classList.add('img__leg-two');
                img6.src = '../assets/leg-two.svg';
                this.imgCon.append(img6)
                break;
        }
    }

    showLetter(event){
        const letters = document.querySelectorAll('.qa__letter');
        for (let i = 0; i < letters.length; i++){
            if (this.state.answer[i] === event.detail && letters[i].innerHTML === ''){
                letters[i].innerHTML = event.detail;
                this.state.correctCounter ++;
                if (this.state.correctCounter === this.state.answer.length){
                        const event = new CustomEvent('gameEnd', {detail: 1});
                        document.dispatchEvent(event);
                }
            }
        }
    }

    disableButton(btn){
        const btns = document.getElementsByClassName('keyboard__key')
        for (let i = 0; i < btns.length; i++){
            if (btns[i].innerHTML === btn){
                btns[i].disabled = true;
            }
        }
    }

    clickHandler(event){
        const key = event.key

        if (this.keys.includes(key) || (key.charCodeAt(0) < 97 || key.charCodeAt(0) > 122)){
            return;
        }

        this.keys.push(key)
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
        document.removeEventListener('keyup', this.clickHandler);
        const modal = document.createElement('section');
        modal.classList.add('main__modal');

        const modalOverlay = document.createElement('section');
        modalOverlay.classList.add('main__modal-overlay');

        const answ = document.createElement('h3');
        answ.classList.add('main__modal__answ');
        answ.innerHTML = this.state.answer;

        const msg = document.createElement('h2');
        msg.classList.add('main__modal__msg');
        switch (status) {
            case 0:
                msg.innerHTML = 'Oh, sorry! You lose. Try again!';
                break;
            case 1:
                msg.innerHTML = 'Congratulation! You win. Try more!';
                break;
        }

        const buttonGE = document.createElement('button');
        buttonGE.classList.add('main__modal__button-ge');
        buttonGE.innerHTML = 'New Game'
        buttonGE.addEventListener('click', () => {
            this.container.innerHTML = '';
            this.clear();
            modalOverlay.remove()
            this.start();
        })

        modal.append(msg, answ, buttonGE);
        modalOverlay.append(modal);
        document.body.classList.add('show-modal');
        document.body.append(modalOverlay);
    }

    start(){
        this.state.lastQuestIndex = sessionStorage.getItem('lastIndex') || '';
        this.gallow = new Gallow();
        this.qa = new QaModule(this.data, this.state);
        this.keyboard = new Keyboard(this.state);

        this.imgCon = document.createElement('div');
        this.imgCon.classList.add('gallow__img__container');
        this.gallow.getHtml().append(this.imgCon)

        this.container.append(this.gallow.getHtml());
        this.container.append(this.qa.getHTML());
        this.container.append(this.keyboard.getHTML());
        this.parent.append(this.container);
        this.clickHandler = this.clickHandler.bind(this)
        document.addEventListener('keyup', this.clickHandler);
    }

    clear(){
        this.keys.length = 0;
        // this.container = null;
        // this.gallow = null;
        // this.qa = null;
        // this.keyboard = null;
        console.log(this.state)
        this.state.answer = '';
        this.state.incorrectCounter = 0;
        this.state.correctCounter = 0;

    }
}

export default Hangman