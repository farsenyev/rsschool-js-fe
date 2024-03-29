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

    constructor() {
        this.data = null;

        this.garage = null;

        this.page = 1;
        this.container = null;
        this.controlsCon = null;
        this.carContainer = null;
        this.selected = null;

        this.init()
    }

    init(){
        this.createHtml()
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
        carName.setAttribute('type', 'text');
        carName.id = 'createdCarName'

        const carColor: HTMLElement = document.createElement('input');
        carColor.setAttribute('type', 'color');
        carColor.id = 'createdCarColor';

        const changeName: HTMLElement = document.createElement('input');
        changeName.setAttribute('type', 'text');
        changeName.id = 'changeCarName'

        const changeColor: HTMLElement = document.createElement('input');
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
    }

    prevPage(){
        this.page--
        this.createCars()
        const updatePage = document.querySelector('.page-number');
        updatePage.innerHTML = String(this.page)
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

                const color: string = car.color;

                carCon.style.background = color;

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

                carCon.append(name, selectBtn, deleteBtn)
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