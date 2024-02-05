class Matrix{
    constructor(path, handle) {
        this.path = path;
        this.matrix = null;
        this.img = null;
        this.onCreate = handle;
        this.init()
    }

    init() {
        this.createMatrix()
    }

    createMatrix(){
        this.img = new Image();
        this.img.src = this.path;
        this.img.onload = this.create;
    }

    create = () => {
        let array = [];
        let canvas = document.createElement('canvas');
        canvas.width = this.img.width;
        canvas.height = this.img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, 0, 0, this.img.height, this.img.width);
        let imgData = ctx.getImageData(0, 0, this.img.height, this.img.width);
        for (let i = 0; i < imgData.height; i++){
            let row = [];
            for (let j = 0; j < imgData.width; j++){
                let index = (i * imgData.width + j) * 4;
                let black = imgData.data[index+3];
                if (black === 255){
                    row.push(1)
                }else{
                    row.push(0)
                }
            }
            array.push(row)
        }
        this.matrix = array

        // need to catch moment when img is loaded and then return matrix to nonogram class
        this.getMatrix(this.matrix)
    }

    getMatrix(){
        this.onCreate()//callback
    }

    onCreate(){}
}

export default Matrix