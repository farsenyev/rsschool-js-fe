class Garage{
    container: HTMLElement | null;
    controlsCon: HTMLElement | null;

    constructor() {
        this.container = null;
        this.controlsCon = null;

        this.init()
    }

    init(){
        this.createHtml()
    }

    createHtml(){
        this.container = document.createElement('section');
        this.container.classList.add('garage-container');

        const carContainer: HTMLElement = document.createElement('div');
        carContainer.classList.add('car-container');

        this.controlsCon = document.createElement('div');
        this.controlsCon.classList.add('controls-con');

        this.createBtns()

        this.container.append(this.controlsCon, carContainer)
    }

    createBtns(){
        const carName: HTMLElement = document.createElement('input');
        carName.setAttribute('type', 'text')

        const carColor: HTMLElement = document.createElement('input');
        carColor.setAttribute('type', 'color')

        const changeName: HTMLElement = document.createElement('input');
        changeName.setAttribute('type', 'text')

        const changeColor: HTMLElement = document.createElement('input');
        changeColor.setAttribute('type', 'color')

        const setBtn: HTMLElement = document.createElement('button');
        setBtn.classList.add('btn');
        setBtn.addEventListener('click', () => this.setHandker())
        setBtn.innerHTML = 'Set'

        const changeBtn: HTMLElement = document.createElement('button');
        changeBtn.classList.add('btn');
        changeBtn.addEventListener('click', () => this.changeHandler())
        changeBtn.innerHTML = 'Change'

        const raceBtn: HTMLElement = document.createElement('button');
        raceBtn.classList.add('btn');
        raceBtn.addEventListener('click', () => this.raceHandler());
        raceBtn.innerHTML = 'Race'

        const resetBtn: HTMLElement = document.createElement('button');
        resetBtn.classList.add('btn');
        resetBtn.addEventListener('click', () => this.resetHandler())
        resetBtn.innerHTML = 'Reset'

        const generateBtn: HTMLElement = document.createElement('button');
        generateBtn.classList.add('btn');
        generateBtn.addEventListener('click', () => this.generateHandler())
        generateBtn.innerHTML = 'Generate Cars'

        this.controlsCon?.append(carName,carColor, setBtn, changeName, changeColor, changeBtn, raceBtn, resetBtn, generateBtn);

    }

    changeHandler(){
        console.log('change')
    }

    setHandker(){
        console.log('set')
    }

    raceHandler(){
        console.log('race')
    }

    resetHandler(){
        console.log('rest')
    }

    generateHandler(){
        console.log('generate')
    }

    getHtml(): Node{
        return this.container as Node;
    }
}

export default Garage