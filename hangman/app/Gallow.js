class Gallow {
    constructor() {
        this.counter = 0;
        this.gallow = null;

        this.init()
    }

    init(){
       const gallowContainer = document.createElement('section');
       gallowContainer.classList.add('gallow__container');

       this.createHtml(gallowContainer)

       this.gallow = gallowContainer
    }

    createHtml(){
        const avaregeNumber = document.createElement('h3');
        avaregeNumber.classList.add('gallow__counter');
        avaregeNumber.innerHTML = `Attempts: ${this.counter}`;

        let mainImg = document.createElement('img');
        mainImg.classList.add('gallow__img');
        mainImg.src = '';
        mainImg.alt = 'gallow';

        let name = document.createElement('h1');
        name.classList.add('gallow__nmae');
        name.innerHTML = 'Hangman'

        parent.append(name, mainImg, avaregeNumber)
    }

    getHtml(){
        return this.gallow
    }
}

export default Gallow