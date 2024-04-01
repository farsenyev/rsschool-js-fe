interface Cars{
    name: string,
    color: string,
    id: number
}

class Requests{
    static _url = "http://localhost:3000";

    static async getCars(limit?: number, page?: number): Promise<string | Cars[] | null>{
        const resp = await fetch(`${this._url}/garage/?_page=${page}&_limit=${limit}`, {method: 'GET'});
        const totalCountHeader = resp.headers.get('X-Total-Count');
        if(!limit || !page) {
            return totalCountHeader
        }
        return await resp.json()
    }

    // static async getCar(name: string, color: string, id: number): Promise<[]>{
    //     const resp = await fetch(`${this._url}/garage/${id}`, {method: 'GET'})
    //
    //     return await resp.json()
    // }

    static async updateCar(newName: string | null, newColor: string | null, id: number, prevName: string, prevColor: string ): Promise<[]>{
        const resp = await fetch(`${this._url}/garage/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName ? newName : prevName,
                color: newColor ? newColor : prevColor
            })
        })

        return await resp.json()
    }

    static async deleteCar(id: number): Promise<[]>{
        const resp = await fetch(`${this._url}/garage/${id}`, {method: 'DELETE'})

        return await resp.json();
    }

    static async createCar(name: string, color: string): Promise<[]>{
        const resp = await fetch(`${this._url}/garage/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                color: color
            })
        });

        return await resp.json();
    }

    static async randomCars(){
        for (let i = 0; i < 100; i ++){
            const car = this.getRandomCar();
            const name = car.randomMark + ' ' + car.randomModel
            await this.createCar(name, car.hexColor)
        }
    }

    static async startStopEngine(id: number, status: string): Promise<{} | string | undefined>{
        try{
            const resp = await fetch(`${this._url}/engine/?id=${id}&status=${status}`, {method: 'PATCH'});
            return await resp.json();
        }catch (e) {
         console.log(e)
        }
    }

    static async switchToDrive(id: number, status: string, callback: Function): Promise<{} | Function | undefined>{
        const resp = await fetch(`${this._url}/engine/?id=${id}&status=${status}`, {method: 'PATCH'});
        if (resp.ok) return await resp.json();
        if (resp.status === 500) return callback();
    }

    static getRandomCar(){
        const marks: string[] = ['BMW', 'Lotus', 'Pininfarina', 'McLaren', 'Koenigsegg', 'Chevrolet', 'McLaren', 'Aston Martin', 'Porsche', 'Rimac']
        const model: string[] = ['M Hybrid V8', 'Evija', 'Battista', 'Speedtail', 'Regera', 'Corvette C8', 'Artura', 'Valkyrie', '918 Spyder', 'Nevera']
        const hexChars = '0123456789ABCDEF';
        let hexColor = '#';
        for (let i = 0; i < 6; i++) {
            hexColor += hexChars[Math.floor(Math.random() * 16)];
        }

        const randomMark = marks[Math.floor(Math.random() * marks.length)]
        const randomModel = model[Math.floor(Math.random() * model.length)]

        return {randomMark, randomModel, hexColor}
    }
}


export default Requests