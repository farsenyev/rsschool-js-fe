import Gallow from './Gallow.js'

class Hangman {
    constructor(parent) {
        // this.data = data;
        this.parent = parent;

        this.init()
    }

    init(){
        const container = document.createElement('main');
        container.classList.add('main__container')
        container.innerText = 'work'

        const gallows = new Gallow()

        container.append(gallows.getHtml())
        this.parent.append(container)
    }
}

export default Hangman