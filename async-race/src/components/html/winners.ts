import Requests from "../requests/index";

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

        this.createTable()
    }

    async createTable(){

        const table = document.createElement('table');
        table.classList.add('table-winners')

        const data = await Requests.getWinner()
        console.log(data)
        data.forEach((winner) => {
            const row = document.createElement('tr');
            const name = document.createElement('td');
            name.innerHTML = winner.name;

            const time = document.createElement('td');
            time.innerHTML = `${winner.time / 1000}`;

            const wins = document.createElement('td');
            wins.innerHTML = winner.wins;

            row.append(name, time, wins)

            table.append(row)
        })

        this.container?.append(table)
    }


    getHtml(): Node {
        return this.container as Node
    }
}

export default Winners