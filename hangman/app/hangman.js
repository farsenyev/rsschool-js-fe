import Gallow from './Gallow.js'

class Hangman {
    constructor(parent) {
        // this.data = data;
        this.parent = parent;
        this.container = null;

        this.init()
    }

    init(){
        this.container = document.createElement('main');
        this.container.classList.add('main__container')

        const gallows = new Gallow()

        this.container.append(gallows.getHtml())
        this.parent.append(this.container)

        document.addEventListener('click', () => {this.clickHandler()})
    }

    clickHandler(){
        const event = new Event('wrong')
        document.dispatchEvent(event)
    }
}

export default Hangman