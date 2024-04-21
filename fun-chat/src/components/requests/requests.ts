import { WebSocket } from 'websocket';

class Requests {
    url: string;
    server: WebSocket;

    constructor() {
        this.url = 'ws://192.168.1.100:4000';
        this.server = new WebSocket(this.url, {noServer: true});
        this.initServer()
    }

    initServer(){
        this.server.onopen = function (event: Event) {
            console.log('connection established')
        }
    }

    authenticateUser(login: string, password: string, id) {
        const request = {
            id: id,
            type: "USER_LOGIN",
            payload: {
                user: {
                    login: login,
                    password: password
                }
            }
        };

        // Send the request

        return this.server.send(JSON.stringify(request));
    }

}

export default Requests
