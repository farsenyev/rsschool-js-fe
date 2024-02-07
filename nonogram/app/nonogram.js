import Matrix from "./matrix.js";
import Draw from "./draw.js";
import Menu from "./menu.js";

class Nonogram {
    constructor(parent, data) {
        this.data = data;
        this.parent = parent;
        this.pix = null;
        this.menu = null;
        this.picture = 0;
        this.container = null;
        this.timerNumbers = null;

        this.init()
    }

    init(){
        this.container = document.createElement('main')
        this.container.classList.add('main')
        this.menu = new Menu(this.data)
        this.start()
    }

    start(){
        this.createMenuBtn()

        this.container.append(this.menu.getHTML())
        this.menuEventHandler()

        this.parent.append(this.container)
    }

    createMenuBtn(){
        const menuBtn = document.createElement('button');
        menuBtn.classList.add('menu__btn');
        menuBtn.innerHTML = 'Menu'

        menuBtn.addEventListener('click',()=> {
            this.container.innerHTML = '';
            this.start()
        })
        this.container.append(menuBtn)
    }

    menuEventHandler(){
        const menuEls = document.getElementsByClassName('menu__el')
        document.addEventListener('DOMContentLoaded', ()=>{
            for (let i = 0; i < menuEls.length; i++){
                menuEls[i].addEventListener('click', ()=>{
                    this.pix = new Matrix(this.data[i/*random number, depends in difficulty*/].path, this.handleCreate.bind(this));
                })
            }
        })
    }

    handleCreate(){

        const layout = new Draw(this.pix.matrix, this.modalHandler.bind(this))
        this.timerNumbers = layout.getTime()

        this.container.innerHTML = ''
        this.createMenuBtn()
        this.container.append(layout.getHtml())

    }

    modalHandler(){
        const modal = document.createElement('section');
        const modalOverlay = document.createElement('div');

        modal.classList.add('main__modal-window');
        modalOverlay.classList.add('modal-overlay');

        const time = document.createElement('h4');
        time.textContent = this.timerNumbers.textContent;
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