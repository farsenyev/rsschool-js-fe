import Controls from "./components/html/controls";
import Garage from "./components/html/garage";
import Winners from "./components/html/winners";

class Race {
    parent: HTMLElement;
    container: HTMLElement | null;
    controls: Controls | null;
    garage: Garage | null;
    winners: Winners | null;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.container = null;

        this.controls = null;
        this.garage = null;
        this.winners = null;

        this.init()
    }

    init() {
        this.container = document.createElement('section');
        this.container.classList.add('main-container')
        this.parent.append(this.container)

        this.loadPage()
    }

    loadPage(){
        this.controls = new Controls(this.loadGarage.bind(this), this.loadWinners.bind(this))
        this.parent.prepend(this.controls.getControls());

        this.loadGarage();
    }

    async loadGarage() {
        console.log('garage')
        this.clearContainer()
        this.garage = new Garage();
        this.container?.append(this.garage.getHtml())
    }

    loadWinners(){
        console.log('winners')
        this.clearContainer()
        this.winners = new Winners()
        this.container?.append(this.winners.getHtml())
    }

    clearContainer(){
        const containerElement: HTMLElement | null = this.container;
        if (containerElement) {
            containerElement.innerHTML = "";
        }
    }

}

export default Race