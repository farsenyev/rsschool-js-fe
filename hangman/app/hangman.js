import Gallow from './Gallow.js';
import QaModule from "./qaModule.js";
import Keyboard from "./keyboard.js";

class Hangman {
    constructor(parent,data) {
        this.data = data;
        this.parent = parent;
        this.container = null;
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
        const QA = new QaModule(this.data, this.state)
        const keyboard = new Keyboard(this.state)

        this.container.append(gallows.getHtml())
        this.container.append(QA.getHTML())
        this.container.append(keyboard.getHTML())
        this.parent.append(this.container)

        document.addEventListener('keyup', (event) => {this.clickHandler(event)})
    }

    clickHandler(event){
        const key = event.key
        if (!this.state.answer.includes(key)){
            const event = new Event('wrong')
            document.dispatchEvent(event)
        }else{
            // show letter
        }

    }
}

export default Hangman