class Controls{
    toGarage: Function;
    toWinners: Function;
    container: HTMLElement | null;

    constructor(toGarage: Function, toWinners: Function) {
        this.toWinners = toWinners;
        this.toGarage = toGarage;
        this.container = null;

        this.init()
    }

    init(){
        this.createHtml()
    }

    createHtml(){
        this.container = document.createElement('section');
        this.container.classList.add('controls-container');

        const btnToGarage: HTMLElement = document.createElement('button');
        btnToGarage.classList.add('garage-btn');
        btnToGarage.innerHTML = 'Garage';
        btnToGarage.addEventListener('click', () => this.goToGarage())

        const btnToWin: HTMLElement = document.createElement('button');
        btnToWin.classList.add('win-btn');
        btnToWin.innerHTML = 'Winners';
        btnToWin.addEventListener('click', () => this.goToWinners())

        this.container.append(btnToGarage, btnToWin)
    }

    goToGarage(){
        this.toGarage();
    }

    goToWinners(){
        this.toWinners();
    }

    getControls(): Node{
        return this.container as Node;
    }

}

export default Controls