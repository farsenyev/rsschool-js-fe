class Requests {
  url: string;
  server: WebSocket;

  activeUsers = [];

  constructor() {
    this.url = 'ws://localhost:4000';
    this.server = new WebSocket(this.url);
    this.server.onmessage = this.msgHandler;
    this.initServer();
  }

  initServer() {
    this.server.onopen = function (event: Event) {
      console.log('connection established');
    };
  }

  msgHandler(msg: MessageEvent){
    const data = JSON.parse(msg.data)
    switch (data.type){
      case 'USER_ACTIVE':
        this.activeUsers = data.payload.users;
        break;
      case 'USER_INACTIVE':
        this.activeUsers = data.payload.users;
        break;
      case 'USER_LOGIN':
        this.activeUsers = data.payload.users;
        break;
      case 'USER_LOGOUT':
        this.activeUsers = data.payload.users;
        break;
      case 'ERROR':
        break;
    }
  }

  authenticateUser(login: string, password: string, id) {
    const request = {
      id: id,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };

    // Send the request

    if (this.server) this.server.send(JSON.stringify(request));
  }
}

export default Requests;
