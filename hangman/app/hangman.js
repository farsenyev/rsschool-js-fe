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
            answer: ''
        }

        this.init()
    }

    init(){
        this.container = document.createElement('main');
        this.container.classList.add('main__container')

        const gallows = new Gallow()
        this.gallow = gallows
        const QA = new QaModule(this.data, this.state)
        this.qa = QA
        const keyboard = new Keyboard(this.state)
        this.keyboard = keyboard

        this.container.append(this.gallow.getHtml())
        this.container.append(this.qa.getHTML())
        this.container.append(this.keyboard.getHTML())
        this.parent.append(this.container)

        document.addEventListener('keyup', (event) => {this.clickHandler(event)})
    }

    clickHandler(event){
        const key = event.key
        if (!this.state.answer.includes(key)){
            const event = new Event('wrong')
            document.dispatchEvent(event)
        }else{
            const event = new CustomEvent('correct', {detail: key})
            document.dispatchEvent(event)
        }

    }
}

export default Hangman