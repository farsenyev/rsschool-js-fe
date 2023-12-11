import data from '../js/data.js'
const menu = document.getElementById('menu')
const burgerBtn = document.querySelector('.burger-btn')

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

class Menu {
    number;
    constructor(parent, data) {
        this.data = data
        this.parent = parent
        this.cards = this.createCardContainer()
        this.render()
        this.screenWidth()
    }

    screenWidth() {
        if (screen.width > 768) {
            this.number = 8
        } else {
            this.number = 4
        }
    }

    createCardContainer(){
        const container = document.createElement('section')
        container.classList.add('item-container')
        return container
    }

    createCategoryControls(){
        const contrContainer = document.createElement('section')
        contrContainer.classList.add('controls-panel')

        const coffeeBtn = document.createElement('button')
        coffeeBtn.textContent = 'Coffee'
        coffeeBtn.classList.add('control')
        coffeeBtn.classList.add('active')
        coffeeBtn.addEventListener("click", () => {
            this.renderCards('coffee')
            this.activateControls(contrContainer)
            coffeeBtn.classList.add('active')
        })

        const teaBtn = document.createElement('button')
        teaBtn.textContent = 'Tea'
        teaBtn.classList.add('control')
        teaBtn.addEventListener("click", () => {
            this.renderCards('tea')
            this.activateControls(contrContainer)
            teaBtn.classList.add('active')
        })

        const desertBtn = document.createElement('button')
        desertBtn.textContent = 'Deserts'
        desertBtn.classList.add('control')
        desertBtn.addEventListener("click", () => {
            this.renderCards('dessert')
            this.activateControls(contrContainer)
            desertBtn.classList.add('active')
        })

        contrContainer.append(coffeeBtn, teaBtn, desertBtn)

        return contrContainer
    }

    render(){
        this.parent.append(this.createCategoryControls())
        this.parent.append(this.cards)
        this.renderCards('coffee')
    }

    renderCards(cat){
        this.clearContainer()

        this.data.forEach((el) => {
            if (el.category === cat){
                this.cards.append(this.createCards(el))
            }
        })
    }

    activateControls(parent){
        const children = parent.childNodes

        for (const child of children){
            if (child.classList.contains('active')){
                child.classList.remove('active')
            }
        }
    }

    clearContainer(){
        this.cards.innerHTML = ''
    }

    createVeiw(el, cll, content){
        let element = document.createElement(el)
        element.classList.add(cll)
        element.textContent = content

        return element
    }

    createCards(obj){
        let card = document.createElement('section')
        card.classList.add('item')

        let imgCon = document.createElement('section')
        imgCon.classList.add('img-con')

        let img = document.createElement('img')
        img.src = obj.imgurl
        img.alt = obj.name
        imgCon.append(img)

        let name = document.createElement('h3')
        name.classList.add('coffee-name')
        name.textContent = obj.name

        let desc = document.createElement('p')
        desc.classList.add('description')
        desc.textContent = obj.description

        let price = document.createElement('h3')
        price.classList.add('price')
        price.textContent = obj.price + '$'

        card.append(imgCon, name, desc, price)

        return card
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

const load = new Menu (menu, data)
const burger = new Burger(burgerBtn)
