import Matrix from "./matrix.js";
import Draw from "./draw.js";

class Nonogram {
    constructor(parent, data) {
        this.data = data;
        this.parent = parent;
        this.pix = null;
        this.container = null;

        this.init()
    }

    init(){
        this.container = document.createElement('main')
        this.container.classList.add('main')

        this.pix = new Matrix(this.data[0/*random number, depends in difficulty*/].path, this.handleCreate.bind(this));

        this.parent.append(this.container)
    }

    handleCreate(){
        console.log(this.pix.matrix)
        const layout = new Draw(this.pix.matrix, this.modalHandler.bind(this))

        this.container.append(layout.getHtml())

    }

    modalHandler(){
        const modal = document.createElement('section');
        const modalOverlay = document.createElement('div');

        modal.classList.add('main__modal-window');
        modalOverlay.classList.add('modal-overlay');

        const time = document.createElement('h4');
        // time = this.timerNumber;

        time.classList.add('modal__timer');

        const txt = document.createElement('h2');
        txt.innerHTML = 'Congratulation, you win!';
        txt.classList.add('modal__text');

        const resetBtn = document.createElement('button');
        resetBtn.classList.add('modal__reset-btn');
        resetBtn.innerHTML = 'Reset';
        resetBtn.onclick = () => {location.reload()}

        modal.append(time, txt, resetBtn)

        this.parent.append(modalOverlay, modal)
    }

}

export default Nonogram