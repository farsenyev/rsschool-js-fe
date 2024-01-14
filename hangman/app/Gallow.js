class Gallow {
    constructor() {
        this.gallow = null;

        this.init();
    }

    init(){
        const gallowContainer = document.createElement('section');
        gallowContainer.classList.add('gallow__container');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('gallow__img-container');

        this.createHtml(gallowContainer);



        this.gallow = gallowContainer;
        this.gallow.append(imgContainer);

    }

    createHtml(parent){
        let mainImg = document.createElement('img');
        mainImg.classList.add('gallow__img');
        mainImg.src = '../assets/gallows.svg';
        mainImg.alt = 'gallow';

        let name = document.createElement('h1');
        name.classList.add('gallow__name');
        name.innerHTML = 'Hangman'

        parent.append(name, mainImg);

    }

    getHtml(){
        return this.gallow;
    }
}

export default Gallow