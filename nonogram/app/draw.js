class Draw{
    constructor(matrix) {
        this.matrix = matrix;
        this.container = null;
        this.rowsNum = null;
        this.colsNum = null;
        this.init()
    }

    init(){
        this.createHtml()
    }

    createHtml(){
        this.container = document.createElement('table');
        this.container.classList.add('matrix__container');
        this.container.style.border = '1px solid black'
        this.addNumbers()

        this.container.prepend(this.rowsNum, this.colsNum)
        for (let row in this.matrix){
            const tableRow = document.createElement('tr')
            tableRow.classList.add('table__row')
            for (let col in this.matrix[row]){
                const sq = document.createElement('td');
                sq.classList.add('matrix__field');
                sq.classList.add('field__' + this.matrix[row][col])
                sq.style.width = '20px'
                sq.style.height = '20px'

                // sq.innerHTML = this.matrix[row][col]
                sq.addEventListener('contextmenu', this.ctxMenuHandler.bind(this))
                tableRow.append(sq)
            }
        this.container.append(tableRow)
        }


    }

    addNumbers(){
        this.rowsNum = document.createElement('div')
        this.rowsNum.classList.add('numbers__row')
        this.colsNum = document.createElement('div')
        this.colsNum.classList.add('number__col')
        for (let row in this.matrix){
            let number = 0
            let con = document.createElement('div')
            let n = document.createElement('p')
            for (let col in this.matrix[row]){
                n = document.createElement('p')
                if (this.matrix[row][col] === 0){
                    //n != 0 write, n = 0
                    if (number !== 0) n.textContent = number.toString()
                    con.append(n)
                    number = 0
                }else{
                    number++
                }
            }
            //n != 0 write
            if (number !== 0) n.textContent = number.toString()
            con.append(n)
            this.rowsNum.append(con)
        }
        for (let row in this.matrix){
            let number = 0
            let con = document.createElement('div')
            let n = document.createElement('p')
            for (let col in this.matrix[row]){
                n = document.createElement('p')
                if (this.matrix[col][row] === 0){
                    //n != 0 write, n = 0
                    if (number !== 0) n.textContent = number.toString()
                    con.append(n)
                    number = 0
                }else{
                    number++
                }
            }
            //n != 0 write
            if (number !== 0) n.textContent = number.toString()
            con.append(n)
            this.colsNum.append(con)
        }
    }

    ctxMenuHandler(event){
        event.preventDefault()
        let div = document.createElement('div');
        div.classList.add('ctx__menu')

        //option for choice to X or fill black
        let target = event.target
        if (target.classList.contains('field__1')){
            target.style.background = 'red'
        }else{
            target.style.background = 'blue'
        }
    }

    getHtml(){
        return this.container
    }
}

export default Draw