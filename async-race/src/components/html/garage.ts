import Requests from "../requests/index";

interface Cars{
    name: string,
    color: string,
    id: number
}

class Garage{
    container: HTMLElement | null;
    controlsCon: HTMLElement | null;
    carContainer: HTMLElement | null;
    data: string | Cars[] | null;
    selected: Cars | null;
    page: number;
    garage: HTMLElement | null;
    carNameValue: string;
    carColorValue: string;
    changedCarNameValue: string;
    changedCarColorValue: string;

    constructor() {
        this.data = null;

        this.garage = null;

        this.page = 1;
        this.carNameValue = '';
        this.carColorValue = '';
        this.changedCarNameValue = '';
        this.changedCarColorValue = '';
        this.container = null;
        this.controlsCon = null;
        this.carContainer = null;
        this.selected = null;

        this.init()
    }

    init(){
        this.getLocalData()
        this.createHtml()
    }

    getLocalData(){
        if (localStorage.getItem('page') !== null) {
            this.page = Number(localStorage.getItem('page'));
        }
        if (localStorage.getItem('carNameValue') !== null) {
            this.carNameValue = String(localStorage.getItem('carNameValue'));
        }
        if (localStorage.getItem('carColorValue') !== null) {
            this.carColorValue = String(localStorage.getItem('carColorValue'));
        }
        if (localStorage.getItem('changedCarNameValue') !== null) {
            this.changedCarNameValue = String(localStorage.getItem('changedCarNameValue'));
        }
        if (localStorage.getItem('changedCarColorValue') !== null) {
            this.changedCarColorValue = String(localStorage.getItem('changedCarColorValue'));
        }
    }

    setLocalData(){
        localStorage.setItem('page', String(this.page));

    }

    setCarLocalData(){
        localStorage.setItem('carNameValue', this.carNameValue);
        localStorage.setItem('carColorValue', this.carColorValue);
        localStorage.setItem('changedCarNameValue', this.changedCarNameValue);
        localStorage.setItem('changedCarColorValue', this.changedCarColorValue);
    }

    createHtml(){
        this.container = document.createElement('section');
        this.container.classList.add('garage-container');

        this.garage = document.createElement('h1');
        this.garage.classList.add('title');
        this.garage.innerHTML = 'Garage'

        this.carContainer = document.createElement('div');
        this.carContainer.classList.add('cars-container');

        this.controlsCon = document.createElement('div');
        this.controlsCon.classList.add('controls-con');

        this.createBtns()
        this.createPaginationControls()
        this.createCars()

        this.container.append(this.garage, this.controlsCon, this.carContainer)
    }

    createBtns(){
        const carName: HTMLElement = document.createElement('input');
        ;(carName as HTMLInputElement).value = this.carNameValue;
        carName.addEventListener('blur', () => {
            this.carNameValue = (event.target as HTMLInputElement).value;
            this.setCarLocalData()
        });
        carName.setAttribute('type', 'text');
        carName.id = 'createdCarName'

        const carColor: HTMLElement = document.createElement('input');
        ;(carColor as HTMLInputElement).value = this.carColorValue
        carColor.addEventListener('blur', () => {
            this.carColorValue = (event.target as HTMLInputElement).value;
            this.setCarLocalData()
        })
        carColor.setAttribute('type', 'color');
        carColor.id = 'createdCarColor';

        const changeName: HTMLInputElement = document.createElement('input');
        changeName.value = this.changedCarNameValue;
        ;(changeName as HTMLInputElement).value = this.changedCarNameValue
        changeName.addEventListener('blur', () => {
            this.changedCarNameValue = (event.target as HTMLInputElement).value;
            this.setCarLocalData()
        })
        changeName.setAttribute('type', 'text');
        changeName.id = 'changeCarName'

        const changeColor: HTMLElement = document.createElement('input');
        ;(changeColor as HTMLInputElement).value = this.changedCarColorValue;
        changeColor.addEventListener('blur', () => {
            this.changedCarColorValue = (event.target as HTMLInputElement).value;
            this.setCarLocalData()
        })
        changeColor.setAttribute('type', 'color');
        changeColor.id = 'changeCarColor'

        const setBtn: HTMLElement = document.createElement('button');
        setBtn.classList.add('btn');
        setBtn.addEventListener('click', () => this.setHandler())
        setBtn.innerHTML = 'Create'

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

    createPaginationControls(){
        const nextBtn = document.createElement('button');
        nextBtn.addEventListener('click', () => this.nextPage())
        nextBtn.innerHTML = 'Next'

        const prevBtn = document.createElement('button');
        prevBtn.addEventListener('click', () => this.prevPage())
        prevBtn.innerHTML = 'Prev'

        const pageNumber = document.createElement('h3');
        pageNumber.innerHTML = String(this.page);
        pageNumber.classList.add('page-number')

        const pagCon = document.createElement('div');
        pagCon.classList.add('pagination-container');

        pagCon.append(prevBtn, pageNumber, nextBtn);

        this.controlsCon?.append(pagCon)
    }

    nextPage(){
        this.page++
        this.createCars()
        const updatePage = document.querySelector('.page-number');
        updatePage.innerHTML = String(this.page)
        this.setLocalData()
    }

    prevPage(){
        this.page--
        this.createCars()
        const updatePage = document.querySelector('.page-number');
        updatePage.innerHTML = String(this.page)
        this.setLocalData()
    }

    async createCars() {
        try{
            this.carContainer ? this.carContainer.innerHTML = '' : false;
            this.data = await Requests.getCars(7, this.page)
            Array.isArray(this.data) ? this.data?.forEach((car: Cars) => {
                const carCon: HTMLElement = document.createElement('div');
                carCon.classList.add('car-container')

                const name: HTMLElement = document.createElement('h3');
                name.innerHTML = car.name;
                name.classList.add('car-name');

                    //TODO: switch to car logo
                const color: string = car.color;
                carCon.style.background = color;

                const startBtn = document.createElement('button');
                startBtn.innerHTML = 'S';
                startBtn.addEventListener('click', () => {
                    this.selected = car;
                    this.startHandler()
                })

                const selectBtn = document.createElement('button');
                selectBtn.addEventListener('click', () => {
                    this.selected = car;
                    this.selectCarHandler()
                });
                selectBtn.innerHTML = 'Select';

                const deleteBtn = document.createElement('button')
                deleteBtn.addEventListener('click', () => {
                    this.selected = car;
                    this.deleteCarHandler()
                })
                deleteBtn.innerHTML = 'Delete';

                carCon.append(name, startBtn, selectBtn, deleteBtn)
                this.updatePage()
                this.carContainer?.append(carCon)
            }) : false;
        }catch (error){
            console.log('something go wrong')
        }
    }

    async updatePage() {
        try {
            const totalCount = await Requests.getCars();
            if (this.garage) {
                this.garage.innerHTML = `Garage(${totalCount})`;
            } else {
                console.error('Garage element not found.');
            }
        } catch (error) {
            console.error('Error updating page:', error);
        }
    }

    async changeHandler(){
        if (this.selected){
            try{
                const changedName = (document.getElementById('changeCarName') as HTMLInputElement).value;
                const changedColor = (document.getElementById('changeCarColor') as HTMLInputElement).value;

                const resp = await Requests.updateCar(
                    changedName !== '' ? changedName : null,
                    changedColor !== '' ? changedColor : null,
                    this.selected.id,
                    this.selected.name,
                    this.selected.color
                );
                if (changedName !== '') this.selected.name = changedName;
                changedColor !== '' ? this.selected.color = changedColor : this.selected.color;
                await this.createCars()
            }catch (error){}
        }
    }

    async setHandler(){
        try {
            const createdName = (document.getElementById('createdCarName') as HTMLInputElement).value;
            const createdColor = (document.getElementById('createdCarColor') as HTMLInputElement).value;
            const resp = await Requests.createCar(createdName, createdColor);

            await this.createCars()
            console.log('succeed')
        }catch (error){
            console.log(error)
        }
    }

    raceHandler(){
        console.log('race')
    }

    resetHandler(){
        console.log('rest')
    }

    async startHandler(){
        if ("id" in this.selected) {
            const start = await Requests.startStopEngine(this.selected.id, 'started');
            const drive = await Requests.switchToDrive(this.selected.id, 'drive', this.stopDrive.bind(this));
        }
    }

    stopDrive(){
        //TODO: stop animation if car
        console.log('work')
    }

    async generateHandler() {
        console.log('generate')
        const data = await Requests.randomCars()
        await this.createCars()
    }

    async selectCarHandler(){
        //point car
    }

    async deleteCarHandler(){
        if (this.selected) {
            try {
                const data = await Requests.deleteCar(this.selected.id);
                console.log('deleted');
                await this.createCars()
            } catch (error){
                console.log(`${error} do not deleted`)
            }
        }
    }

    getHtml(): Node{
        return this.container as Node;
    }
}

export default Garage