import data from "../js/dataMain.js"
const burgerBtn = document.querySelector('.burger-btn')

const slider = document.querySelector('.slider-content')

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

class Carousel {
    num = 0;
    timer = 0;
    interval = null;
    xDown = 0;
    yDown = 0;
    // touchendX = 0;
    // touchendY = 0;
    constructor(parent, data) {
        this.parent = parent
        this.data = data
        this.sliderWrapper = null
        this.render()

    }

    createSliderWrapper() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')


        wrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        wrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), false);


        this.wrapper = wrapper
        this.wrapper.append(this.createNewSlide())
    }

    handleTouchStart(evt) {
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
    };


    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.slideRight()
            } else {
                this.slideLeft()
            }
        }

        this.xDown = null;
        this.yDown = null;
    };


    createControls() {
        const contrContainer = document.createElement('div')
        contrContainer.classList.add('controls')

        const control1 = document.createElement('button')
        control1.classList.add('control-btn')
        control1.classList.add('active')

        const control2 = document.createElement('button')
        control2.classList.add('control-btn')

        const control3 = document.createElement('button')
        control3.classList.add('control-btn')

        contrContainer.append(control1, control2, control3)

        return contrContainer
    }

    render() {
        this.createSliderWrapper()
        this.parent.append(this.wrapper, this.createControls())
        this.startTimer()
        this.slideByBtn()
        document.querySelector('.slider').addEventListener("mouseover", () => {
            this.stopTimer()
        })
        document.querySelector('.slider').addEventListener("mouseout", () => {
            this.startTimer()
        })
    }


    clearSlide() {
        this.wrapper.innerHTML = ''
    }

    createNewSlide() {
        const con = document.createElement('section')
        con.classList.add('slider-info')

        let img = document.createElement('img')
        img.classList.add('slider-img')
        img.src = this.data[this.num].imgurl
        img.alt = this.data[this.num].name

        let name = document.createElement('h3')
        name.classList.add('coffee-name')
        name.textContent = this.data[this.num].name

        let desc = document.createElement('p')
        desc.classList.add('text', 'slider-text')
        desc.classList.add('description')
        desc.textContent = this.data[this.num].description

        let price = document.createElement('h3')
        price.classList.add('price')
        price.textContent = this.data[this.num].price + '$'

        con.append(img, name, desc, price)

        return con
    }

    startTimer() {
        this.interval = setTimeout(() => {
            this.timer += 10
            if (this.timer === 6000) {
                this.slideRight()
                this.timer = 0;
                this.startTimer()
            } else {
                this.startTimer()
            }
            //if mouse over block
            //clearTimeout
        }, 10)
    }

    stopTimer() {
        clearInterval(this.interval)
    }

    slideByBtn() {
        const leftBtn = document.querySelector('#l-btn')
        const rightBtn = document.querySelector('#r-btn')

        leftBtn.addEventListener("click", () => {
            this.slideLeft()
        })

        rightBtn.addEventListener("click", () => {
            this.slideRight()
        })
    }

    slideRight() {
        if (this.num === this.data.length - 1) {
            this.num = 0
            this.clearSlide()
            this.wrapper.append(this.createNewSlide())
            this.changeActiveButton()
        } else {
            this.num++
            this.clearSlide()
            this.wrapper.append(this.createNewSlide())
            this.createNewSlide()
            this.changeActiveButton()
        }
    }

    slideLeft() {
        if (this.num === 0) {
            this.num = this.data.length - 1
            this.clearSlide()
            this.wrapper.append(this.createNewSlide())
            this.changeActiveButton()
        } else {
            this.num--
            this.clearSlide()
            this.wrapper.append(this.createNewSlide())
            this.changeActiveButton()
        }
    }

    changeActiveButton() {
        const btns = document.querySelectorAll('.control-btn')

        for (const btn of btns) {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active')
            }
        }
        btns[this.num].classList.add('active')
    }

}

class Burger {
    constructor(elem) {
        this.elem = elem
        this.render()
    }

    render(){
        this.addMenuBtn()
        this.elem.addEventListener("click", () =>{
            this.mainButtonAction()
        })
    }

    addMenuBtn(){
        let nav = document.querySelector('nav')

        const menuBtn = document.createElement('a')
        menuBtn.href = "../html/menu.html"
        menuBtn.classList.add('menu-btn2')

        const text = document.createElement('p')
        text.textContent = 'Menu'
        text.classList.add('text')

        const img = document.createElement('img')
        img.src = "../assets/img/coffee-cup.svg"
        img.alt = "coffee cup"
        img.classList.add('menu-logo')

        menuBtn.append(text, img)

        nav.append(menuBtn)

    }

    mainButtonAction(){
        let nav = document.querySelector('nav')
        if (!nav.classList.contains('burger-show')){
            nav.classList.remove('burger-hide')
            nav.style.display = 'flex'
            nav.classList.add('burger-show')
            this.rotateToX()
        }else{
            nav.classList.add('burger-hide')
            this.rotateBack()
            sleep(990).then(() => {
                nav.style.display = 'none'
                nav.classList.remove('burger-show')

            })
        }
    }

    rotateToX(){
        let log1 = document.querySelectorAll('.burger-btn-logo svg')[0]
        let log2 = document.querySelectorAll('.burger-btn-logo svg')[1]

        if (log1.classList.contains('back-lines')){
            log1.classList.add('rotate-top-line')
            log2.classList.add('rotate-bot-line')
            log1.classList.remove('back-lines')
            log2.classList.remove('back-lines')
        }else{
            log1.classList.add('rotate-top-line')
            log2.classList.add('rotate-bot-line')
        }

    }

    rotateBack(){
        let log1 = document.querySelectorAll('.burger-btn-logo svg')[0]
        let log2 = document.querySelectorAll('.burger-btn-logo svg')[1]

        log1.classList.add('back-lines')
        log2.classList.add('back-lines')
        sleep(990).then(() => {
            log1.classList.remove('rotate-top-line')
            log2.classList.remove('rotate-bot-line')
        })
    }


}

const bur = new Burger(burgerBtn)
const slide = new Carousel(slider, data)
