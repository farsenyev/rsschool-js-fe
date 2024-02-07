class Menu {
    constructor(data, callback) {
        this.data = data;
        this.container = null;
        this.callback = callback
        this.init();
    }

    init(){
        this.createMenu()
    }

    createMenu(){
        this.container = document.createElement('section');
        this.container.classList.add('menu__container');

        for (let i = 0; i < this.data.length; i++){
            const menuEl = document.createElement('div');
            menuEl.classList.add('menu__el');
            menuEl.id = 'menu__el__' + i;

            const img = document.createElement('img');
            img.classList.add('menu__img');
            img.alt = 'menu picture to solve';
            img.src = this.data[i].path;

            const name = document.createElement('h3');
            name.classList.add('menu__el__name');
            name.innerHTML = this.data[i].path.split('/')[2].split('.')[0];

            const dif = document.createElement('p');
            dif.classList.add('menu__el__dif');
            dif.innerHTML = this.data[i].difficulty;

            menuEl.append(name, dif)
            this.container.append(menuEl)
        }
    }

    getMenuEls(){
        return document.getElementsByClassName('menu__el')
    }

    getHTML(){
        return this.container
    }
}

export default Menu