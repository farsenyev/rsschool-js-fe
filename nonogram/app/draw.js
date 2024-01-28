class Draw{
    constructor(matrix) {
        this.matrix = matrix;
        this.container = null;
        this.init()
    }

    init(){
        this.createHtml()
    }

    createHtml(){
        // console.log(this.matrix)

        this.container = document.createElement('section');
        this.container.classList.add('matrix__container');

        for (let row in this.matrix){
            for (let col in this.matrix[row]){
                const sq = document.createElement('div');
                sq.classList.add('matrix__field');
                sq.classList.add('field__' + this.matrix[row][col])

                sq.innerHTML = this.matrix[row][col]
                this.container.append(sq)
            }
        }
    }

    getHtml(){
        return this.container
    }
}

export default Draw