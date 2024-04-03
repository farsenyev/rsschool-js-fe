import Requests from "../requests/index";

class Winners {
    container: HTMLElement | null;
    page: number;
    totalPages: number;

    constructor() {
        this.container = null;
        this.page = 1;
        this.totalPages = 0;

        this.init()
    }

    init() {
        this.getData()
        this.createHtml()
    }

    async getData(){
        const data = await Requests.getWinner()
        this.totalPages = Math.ceil(data.length / 10);
    }

    createHtml(){
        this.container = document.createElement('section');
        this.container.classList.add('winner-container');

        this.createTable()
        this.createPagination()
    }

    async createTable(){

        const table = document.createElement('table');
        table.classList.add('table-winners');
        table.id = 'table'

        const data = await Requests.getWinner();
        const cars = await Requests.getCars(10, this.page);

        const startIndex = (this.page - 1) * 10;
        const endIndex = startIndex + 10;
        const currentData = data.slice(startIndex, endIndex);

        currentData.forEach((winner, i = 0) => {
            const row = document.createElement('tr');
            const name = document.createElement('td');
            name.innerHTML = winner.name;
            if (cars != null) {
                name.style.color = cars[i].color
            }

            const time = document.createElement('td');
            time.innerHTML = `${winner.time / 1000}s`;

            const wins = document.createElement('td');
            wins.innerHTML = winner.wins;

            row.append(name, time, wins)

            table.append(row)
            i++
        })

        this.container?.append(table)
    }

    createPagination(){
        const pagination = document.createElement('div');
        pagination.classList.add('pagination-container');

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('next-btn');
        nextBtn.innerHTML = 'Next'
        nextBtn.addEventListener('click', ()=>this.nextHandeler())

        const prevBtn = document.createElement('button');
        prevBtn.classList.add('prev-btn');
        prevBtn.innerHTML = 'prev'
        prevBtn.addEventListener('click', ()=>this.prevHandeler())

        const numberPage = document.createElement('h3');
        numberPage.classList.add('number-page');
        numberPage.innerHTML = String(this.page)

        pagination.append(prevBtn, numberPage, nextBtn);
        this.container?.prepend(pagination)
    }

    nextHandeler(){
        if (this.page < this.totalPages) {
            this.page++;
            const table = document.getElementById('table');
            if (table) table.remove();
            this.createTable();
        }    }

    prevHandeler(){
        if (this.page > 1) {
            this.page--;
            const table = document.getElementById('table');
            if (table) table.remove();
            this.createTable();
        }
    }

    getHtml(): Node {
        return this.container as Node
    }
}

export default Winners