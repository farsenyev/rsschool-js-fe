import Timer from "./controls.js";

class Draw{
    constructor(matrix, modalHandler) {
        this.timer = null;
        this.matrix = matrix;
        this.answer = new Array(matrix.length);
        this.container = null;
        this.rowsNum = null;
        this.colsNum = null;
        this.modals = modalHandler;
        this.init()
    }

    init(){

        this.answer = Array.from(Array(this.matrix.length), () => {return new Array(this.matrix.length).fill(0)})
        this.timer = new Timer(this.timer)

        this.container = document.createElement('section');
        this.container.classList.add('matrix__container');
        this.container.style.border = '1px solid black'

        this.createHtml()

    }

    createHtml(){
        this.container.append(this.timer.getHTML())
        this.addNumbers()

        this.container.prepend(this.rowsNum, this.colsNum)
        const table = document.createElement('table')
        table.classList.add('matrix__table')
        for (let row in this.matrix){
            const tableRow = document.createElement('tr')
            tableRow.classList.add('table__row')
            for (let col in this.matrix[row]){
                const sq = document.createElement('td');
                sq.classList.add('matrix__field');

                sq.id = `${row}/${col}`
                sq.addEventListener('click', this.clickHandler.bind(this))
                sq.addEventListener('contextmenu', this.ctxMenuHandler.bind(this))
                tableRow.append(sq)
            }
        table.append(tableRow)
        }

        const resetBtn = document.createElement('button');
        resetBtn.classList.add('matrix__reset-btn');
        resetBtn.innerHTML = 'Reset'
        resetBtn.addEventListener('click', this.resetGame.bind(this))
        this.container.append(resetBtn, table)
    }

    resetGame(){
        this.container.innerHTML = '';
        this.answer = Array.from(Array(this.matrix.length), () => {return new Array(this.matrix.length).fill(0)})
        this.createHtml()
        this.timer.reset()
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

        if (!this.timer.isRun()) this.timer.startTimer()

        let target = event.target
        target.innerHTML = 'X'
        const id = target.getAttribute('id').split('/')
        const x = id[0]
        const y = id[1]
        target.classList.remove('black')
        this.answer[x][y] = 0
    }

    clickHandler(event){

        if (!this.timer.isRun()) this.timer.startTimer()
        let target = event.target
        target.innerHTML = ''
        const id = target.getAttribute('id').split('/')
        const x = id[0]
        const y = id[1]

        if (!target.classList.contains('black')){
            target.classList.add('black')
            console.log('set 1')
            this.answer[x][y] = 1
        }else{
            target.classList.remove('black')
            this.answer[x][y] = 0
        }
        this.checkArrays()
    }

    checkArrays(){
        this.gameEnd()

    }

    gameEnd(){
        console.log(this.matrix, this.answer)
        for (let i = 0; i < this.matrix.length; i++){
            for (let j = 0; j < this.matrix[i].length; j++){
                if (this.matrix[i][j] !== this.answer[i][j]){
                    return false
                }
            }
        }
        // return true, and show congratulations
        this.modals()
        this.timer.stop()
    }

    modals(){}

    getHtml(){
        return this.container
    }

    getTime(){
        return this.timer.getTimer()
    }
}

export default Draw