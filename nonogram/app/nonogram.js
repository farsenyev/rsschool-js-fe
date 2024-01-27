import Matrix from "./matrix.js";

class Nonogram {
    constructor(parent, data) {
        this.data = data;
        this.parent = parent;

        this.init()
    }

    init(){
        const container = document.createElement('main')
        container.classList.add('main')

        const matrix = new Matrix(/*random number, depends in difficulty*/0, this.data).getMatrix()

        const layout = new Draw(matrix)

        this.parent.append(layout)

    }

}

export default Nonogram