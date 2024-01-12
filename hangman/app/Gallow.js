class Gallow {
    constructor() {
        this.counter = 0;
        this.gallow = null;
        this.acounter = null;

        this.init()
    }

    init(){
       const gallowContainer = document.createElement('section');
       gallowContainer.classList.add('gallow__container');
       
       const avaregeNumber = document.createElement('h3');
       avaregeNumber.classList.add('gallow__counter');
       avaregeNumber.innerHTML = this.counter;
       this.acounter = avaregeNumber

       this.createHtml(gallowContainer)

       this.gallow = gallowContainer

        document.addEventListener('wrong', () => {this.wrongHandler()})
    }

    createHtml(parent){
        let mainImg = document.createElement('img');
        mainImg.classList.add('gallow__img');
        mainImg.src = '';
        mainImg.alt = 'gallow';

        let name = document.createElement('h1');
        name.classList.add('gallow__nmae');
        name.innerHTML = 'Hangman'

        parent.append(name, mainImg, this.acounter)
    }

    wrongHandler(){
        this.counter ++
        this.acounter.innerHTML = this.counter;
        console.log('+1')
    }

    getHtml(){
        return this.gallow
    }
}

export default Gallow