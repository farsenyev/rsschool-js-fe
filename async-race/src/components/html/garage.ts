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
    intervals: NodeJS.Timeout[];

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
        this.intervals = [];

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

    setCarNameLocalData(){
        localStorage.setItem('carNameValue', this.carNameValue);
    }

    setCarColorLocalData(){
        localStorage.setItem('carColorValue', this.carColorValue);
    }

    setCarNameChangedLocalData(){
        localStorage.setItem('changedCarNameValue', this.changedCarNameValue);
    }

    setCarColorChangedLocalData(){
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
            this.carNameValue = (event!.target as HTMLInputElement).value;
            this.setCarNameLocalData();
        });
        carName.setAttribute('type', 'text');
        carName.id = 'createdCarName'

        const carColor: HTMLElement = document.createElement('input');
        ;(carColor as HTMLInputElement).value = this.carColorValue
        carColor.addEventListener('blur', () => {
            this.carColorValue = (event!.target as HTMLInputElement).value;
            this.setCarColorLocalData();
        });

        carColor.setAttribute('type', 'color');
        carColor.id = 'createdCarColor';

        const changeName: HTMLInputElement = document.createElement('input');
        changeName.value = this.changedCarNameValue;
        ;(changeName as HTMLInputElement).value = this.changedCarNameValue
        changeName.addEventListener('blur', () => {
            this.changedCarNameValue = (event!.target as HTMLInputElement).value;
            this.setCarNameChangedLocalData()
        })
        changeName.setAttribute('type', 'text');
        changeName.id = 'changeCarName'

        const changeColor: HTMLElement = document.createElement('input');
        ;(changeColor as HTMLInputElement).value = this.changedCarColorValue;
        changeColor.addEventListener('blur', () => {
            this.changedCarColorValue = (event!.target as HTMLInputElement).value;
            this.setCarColorChangedLocalData()
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
        raceBtn.addEventListener('click', () => {
            this.raceHandler()
        });
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
        if (updatePage) updatePage.innerHTML = String(this.page)
        this.setLocalData()
    }

    prevPage(){
        if (this.page === 1) return
        this.page--
        this.createCars()
        const updatePage = document.querySelector('.page-number');
        if (updatePage !== null) {
            updatePage.innerHTML = String(this.page);
        }
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

                const svg: string =
                    `<svg xmlns="http://www.w3.org/2000/svg" id="carSvg" width="120" height="120" fill="${car.color}" viewBox="0 0 256 256" xml:space="preserve">
                        <path d="M212.435 174.994c-13.098 0-23.753-10.655-23.753-23.753s10.655-23.753 23.753-23.753 23.753 10.656 23.753 23.753-10.656 23.753-23.753 23.753zm0-39.076c-8.45 0-15.323 6.874-15.323 15.323s6.873 15.323 15.323 15.323 15.323-6.873 15.323-15.323-6.876-15.323-15.323-15.323zM51.478 174.994c-13.097 0-23.753-10.655-23.753-23.753s10.656-23.753 23.753-23.753 23.753 10.656 23.753 23.753-10.656 23.753-23.753 23.753zm0-39.076c-8.447 0-15.323 6.874-15.323 15.323s6.873 15.323 15.323 15.323 15.323-6.873 15.323-15.323-6.873-15.323-15.323-15.323z"/>
                        <path d="M212.438 159.663a8.459 8.459 0 0 1-5.958-2.473 7.806 7.806 0 0 1-1.067-1.262 9.018 9.018 0 0 1-.76-1.464 6.231 6.231 0 0 1-.477-1.573 8.33 8.33 0 0 1-.171-1.66c0-.532.059-1.097.171-1.628.082-.562.253-1.07.478-1.602.194-.505.478-.986.759-1.433.309-.477.674-.899 1.067-1.292.366-.396.815-.734 1.265-1.04.478-.309.955-.562 1.464-.787a10.073 10.073 0 0 1 1.574-.477 8.236 8.236 0 0 1 3.315 0c.534.112 1.04.28 1.577.477.506.225.983.478 1.433.787.478.306.899.644 1.292 1.04.394.393.731.815 1.04 1.292.31.447.562.928.787 1.433.194.532.365 1.04.478 1.602.112.531.168 1.096.168 1.627 0 .562-.056 1.099-.168 1.66a10.581 10.581 0 0 1-.478 1.574c-.225.506-.478.984-.787 1.464-.309.447-.646.897-1.04 1.262a7.64 7.64 0 0 1-1.292 1.068c-.45.284-.927.562-1.433.761-.534.225-1.04.394-1.577.478a8.553 8.553 0 0 1-1.66.166zM51.48 159.663a8.299 8.299 0 0 1-1.657-.169c-.534-.112-1.068-.253-1.574-.477-.506-.197-.983-.478-1.46-.762a8.718 8.718 0 0 1-1.265-1.068 8.47 8.47 0 0 1-2.473-5.957c0-.53.056-1.096.168-1.627.113-.534.253-1.07.478-1.576.197-.531.478-1.012.759-1.461.309-.478.674-.9 1.068-1.293a8.515 8.515 0 0 1 1.264-1.04c.478-.309.955-.562 1.461-.787.506-.196 1.04-.365 1.574-.477a8.098 8.098 0 0 1 3.288 0c.562.112 1.067.28 1.601.477.506.225.984.478 1.433.787.478.307.9.644 1.293 1.04.393.393.73.815 1.04 1.293.309.446.562.927.786 1.46.197.507.366 1.04.478 1.577.113.531.169 1.096.169 1.627 0 2.22-.9 4.412-2.473 5.957a7.64 7.64 0 0 1-1.293 1.068c-.45.284-.927.562-1.433.762-.506.224-1.04.365-1.601.477a7.83 7.83 0 0 1-1.63.169z"/>
                        <rect id="carSvg"/>
                        <path d="m225.53 116.243-41.322-10.597-19.695-11.428a100.079 100.079 0 0 0-50.164-13.502H84.625c-19.176 0-37.494 7.168-51.578 20.184a10.864 10.864 0 0 1-7.401 2.895h-6.29c-7.637 0-14.086 5.718-15.002 13.302l-2.846 23.64a13.903 13.903 0 0 0 9.09 14.787l12.923 4.693a29.276 29.276 0 0 1-1.416-8.978c0-16.197 13.176-29.373 29.373-29.373s29.373 13.176 29.373 29.373c0 4.442-1.02 8.64-2.793 12.42h107.797c-1.773-3.78-2.793-7.978-2.793-12.42 0-16.197 13.176-29.373 29.373-29.373s29.373 13.176 29.373 29.373c0 3.875-.773 7.567-2.142 10.956l8.192-1.31a7.621 7.621 0 0 0 6.449-7.559c0-17.486-11.836-32.736-28.778-37.083zM77.1 111.457c-3.673 0-7.003-1.714-9.136-4.7-2.135-2.988-2.678-6.694-1.486-10.167l1.843-5.384c5.291-1.313 10.748-2.057 16.307-2.057h6.46l9.458 22.308H77.1zm82.673 0H109.7l-9.458-22.308h14.106a91.628 91.628 0 0 1 45.932 12.361l12.876 7.469c-4.288 1.613-8.77 2.478-13.384 2.478z"/>
                    </svg>`

                const carLogo: HTMLElement = document.createElement('div');
                carLogo.innerHTML = svg;
                carLogo.classList.add('car-logo')
                carLogo.id = `car-${car.id}`;

                const moveCar: HTMLElement = document.createElement('div');
                moveCar.classList.add('move-car');
                moveCar.id = `move-car-${car.id}`

                const raceDiv: HTMLElement = document.createElement('div');
                raceDiv.classList.add('race');
                raceDiv.append(moveCar, carLogo);

                const startBtn = document.createElement('button');
                startBtn.id = `start-btn-${car.id}`;
                startBtn.innerHTML = 'S';
                startBtn.addEventListener('click', (event) => {
                    const target: EventTarget | null | undefined = event?.target;
                    if (target) {
                        (target as HTMLButtonElement).disabled = true;

                        const stopBtn = document.getElementById(`stop-btn-${car.id}`) as HTMLButtonElement | null;
                        if (stopBtn) {
                            stopBtn.disabled = false;
                        }

                        this.selected = car;
                        const id = car.id;
                        this.startHandler(id);
                    }
                });
                const stopBtn = document.createElement('button');
                stopBtn.id = `stop-btn-${car.id}`;
                stopBtn.innerHTML = 'D';
                stopBtn.disabled = true;
                stopBtn.addEventListener('click', (event) => {
                    const target:EventTarget | null | undefined = event?.target
                    if (target) {
                        (target as HTMLButtonElement).disabled = true;

                        const startBtn = document.getElementById(`start-btn-${car.id}`) as HTMLButtonElement | null;
                        if (startBtn) {
                            startBtn.disabled = false;
                        }

                        this.selected = car;
                        const id = car.id
                        this.stopHandler(id)
                    }
                });

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

                carCon.append(name, startBtn, stopBtn, selectBtn, deleteBtn, raceDiv)
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
                console.log(resp)
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
            console.log(resp)
            await this.createCars()
            console.log('succeed')
        }catch (error){
            console.log(error)
        }
    }

    async raceHandler() {
        if (Array.isArray(this.data)) {
            const ids = this.data.map(car => car.id);
            console.log(ids)
            const cars: Promise<{ state: string; time: number; id: number } | { state: string; id: number }>[] = ids.map(car => this.startHandler(car));
            console.log(cars, 'cars array');
            (Promise.all(cars)).then((data) => {
                console.log(data);
                const finishedCars = data.filter(car => car.state === 'finished');
                if (finishedCars.length > 0) {
                    const winner = finishedCars.sort((a, b) => a.time - b.time)[0];
                    console.log(winner.id)
                    this.winHandler(winner.id, winner.time)
                }
            }).catch(error => {
                console.error('Ошибка:', error);
            });
        }
        console.log('race');
    }


    async resetHandler(){
        if(Array.isArray(this.data)) {
            const ids = this.data.map(car => car.id);
            const reset = ids.map(id => this.stopHandler(id))
            await Promise.race(reset)
        }

        const modal = document.getElementById('modal-con')
        if (modal) modal.remove()
    }

    async startHandler(id: number){
        const start = await Requests.startStopEngine(id, 'started');
        const data: {velocity: number, distance: number} = start as {velocity: number, distance: number};
        const width = window.innerWidth;
        const carSize = 120 * 2;
        const race = width - carSize;
        const distance = document.getElementById(`move-car-${id}`)//race
        distance && (distance.style.maxWidth = race + 'px');
        const velocity = data.velocity / data.distance * race;
        let counter = 0;
        const drive = Requests.switchToDrive(id, 'drive', this.stopDrive.bind(this));

        this.intervals[id] = setInterval(() => {
            if (counter >= race){
                clearInterval(this.intervals[id])
            }
            if (!drive){
                clearInterval(this.intervals[id])
            }
            counter += velocity * 10;
            distance && (distance.style.width = counter + 'px');
        }, 10)
        const startTime = Date.now()
        return drive.then((data) => {
            clearInterval(this.intervals[id]);
            const endTime = Date.now();
            if (data.success) return { state: 'finished', id: id, time: endTime - startTime };
            throw new Error('test');
        }).catch((e) => {
            clearInterval(this.intervals[id]);
            return { state: 'broken', id: id };
        });
    }

    stopDrive(){
        //TODO: stop animation of car
        console.log('work')
    }

    async stopHandler(id: number){
        const stop = await Requests.startStopEngine(id, 'stopped');
        console.log(stop)
        clearInterval(this.intervals[id])
        const distance = document.getElementById(`move-car-${id}`)//race
        if (distance) distance.style.width = 0 + 'px'
    }

    async generateHandler() {
        console.log('generate')
        const data = await Requests.randomCars()
        console.log(data)
        await this.createCars()
    }

    async selectCarHandler(){
        //point car
    }

    async deleteCarHandler() {
        if (this.selected) {
            try {
                const data = await Requests.deleteCar(this.selected.id);
                console.log('deleted', data);
                await this.createCars()
            } catch (error) {
                console.log(`${error} do not deleted`)
            }
        }
        if ("id" in this.selected) {
            const winnerExist = await Requests.getWinner(this.selected.id);
            // console.log(this.selected.id)
            const deleteWinner = await Requests.deleteWinner(this.selected.id);
        }
    }

    async winHandler(id: number, time: number) {
        const modal = document.createElement('div');
        modal.classList.add('modal-con');
        modal.id = 'modal-con'

        const text = document.createElement('h1');
        text.classList.add('modal-text');

        if (this.data != null) {
            text.innerHTML = `${this.data[id-1].name} wins the race in ${time / 1000}s`
        }

        modal.append(text);

        this.container?.append(modal)

        //TODO: add to winners OR update existing

        if (this.data != null) {
            var name = this.data[id-1].name
        }

        const winnerExist = await Requests.getWinner(id);
        if (winnerExist.length === 0) {
            const create = await Requests.createWinner(id, name, time, 1);
        }else{
            const winner = winnerExist.find(winner => winner.id === id)
            let wins = Number(winner.wins)
            wins++
            const update = await Requests.updateWinner(id, wins, time, winner.name);
        }

    }

    getHtml(): Node{
        return this.container as Node;
    }
}

export default Garage