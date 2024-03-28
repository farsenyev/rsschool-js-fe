class Winners {
    container: HTMLElement | null;

    constructor() {
        this.container = null;

        this.init()
    }

    init(){
        this.createHtml()
    }

    createHtml(){
        this.container = document.createElement('section');
        this.container.classList.add('winner-container');


    }
}

export default Winners