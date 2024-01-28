import Matrix from "./matrix.js";
import Draw from "./draw.js";

class Nonogram {
    constructor(parent, data) {
        this.data = data;
        this.parent = parent;
        this.pix = null;

        this.init()
    }

    init(){
        const container = document.createElement('main')
        container.classList.add('main')

        this.pix = new Matrix(this.data[0/*random number, depends in difficulty*/].path, this.handleCreate.bind(this));

    }

    handleCreate(){
        console.log(this.pix.matrix)
        const layout = new Draw(this.pix.matrix)

        this.parent.append(layout.getHtml())
    }

}

export default Nonogram