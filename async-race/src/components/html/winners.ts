import Requests from "../requests/index";

interface Cars{
    name: string,
    color: string,
    id: number
}

class Winners {
    container: HTMLElement | null;
    page: number;
    totalPages: number;
    sortDescending: boolean;

    constructor() {
        this.container = null;
        this.page = 1;
        this.totalPages = 0;
        this.sortDescending = true;

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

        const fRow = document.createElement('tr');

        const nameTxt = document.createElement('th');
        nameTxt.innerHTML = 'Model';

        const timeTxt = document.createElement('th');
        timeTxt.innerHTML = 'Time';

        const winsTxt = document.createElement('th');
        winsTxt.innerHTML = 'Wins';

        timeTxt.addEventListener('click', () => this.sortTable('time'));
        winsTxt.addEventListener('click', () => this.sortTable('wins'));

        fRow.append(nameTxt, timeTxt, winsTxt)

        table.append(fRow)

        const data = await Requests.getWinner();
        const cars = await Requests.getCars(10, this.page);

        const startIndex = (this.page - 1) * 10;
        const endIndex = startIndex + 10;
        const currentData = data.slice(startIndex, endIndex);

        currentData.forEach((winner: {name: string, time: number, wins: number}, i = 0) => {
            const row = document.createElement('tr');
            const name = document.createElement('td');
            name.textContent = winner.name;
            if (cars != null) {
                name.style.color = (cars[i] as Cars).color
            }

            const time = document.createElement('td');
            time.textContent = `${winner.time / 1000}s`;

            const wins = document.createElement('td');
            wins.textContent = String(winner.wins);

            row.append(name, time, wins)

            table.append(row)
            i++
        })

        this.container?.append(table)
    }

    sortTable(key: string) {
        const table = document.getElementById('table');
        if (!table) return;

        const rows = Array.from(table.querySelectorAll('tr'));
        const headerRow = rows.shift();

        rows.sort((a, b) => {
            const aValue = a.querySelector(`td:nth-child(${this.getColumnIndex(key)})`)?.textContent ?? '';
            const bValue = b.querySelector(`td:nth-child(${this.getColumnIndex(key)})`)?.textContent ?? '';

            if (key === 'name') {
                if (aValue > bValue) return 1;
                return -1;
            } else if (key === 'time') {
                return Number(aValue.slice(0, -1)) - Number(bValue.slice(0, -1));
            }else{
                return Number(aValue) - Number(bValue)
            }
        });

        this.sortDescending = !this.sortDescending; // Toggle sorting order

        if (this.sortDescending) {
            rows.reverse();
        }

        table.innerHTML = '';
        table.append(headerRow as Node, ...rows);
    }

    getColumnIndex(key: string): number {
        const headerRow = document.querySelector('#table tr:first-child');
        if (!headerRow) return -1;

        const headers = Array.from(headerRow.querySelectorAll('th'));
        return headers.findIndex(header => header.textContent?.toLowerCase().trim() === key) + 1;
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