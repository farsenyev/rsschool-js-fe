class Matrix{
    constructor(num, data) {
        this.data = data;
        this.num = num;
        this.matrix = [];
        this.init()
    }

    init() {
        this.createMatrix()
    }

    createMatrix(){
        let array = [];
        let img = new Image();
        img.src = this.data[this.num].path;
        img.onload = async function(){
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.height, img.width);
            let imgData = ctx.getImageData(0, 0, img.height, img.width);
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
        }


    }

    getMatrix(){
        return this.matrix
    }
}

export default Matrix