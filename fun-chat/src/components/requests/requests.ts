class Requests {
  url: string;
  server: WebSocket;

  activeUsers = [];
  serverHandler = Object | null;

  constructor() {
    this.url = 'ws://localhost:4000';
    this.server = new WebSocket(this.url);
    this.server.onmessage = this.msgHandler;
    this.initServer();
  }

  initServer() {
    this.serverHandler = setInterval(() => {
      const active = {
        id: 'string',
        type: 'USER_ACTIVE',
        payload: null,
      };
      const inactive = {
        id: 'string',
        type: 'USER_INACTIVE',
        payload: null,
      };

      if (this.server) this.server.send(JSON.stringify(active));
      if (this.server) this.server.send(JSON.stringify(inactive));
    }, 100);
  }

  msgHandler(msg: MessageEvent) {
    const data = JSON.parse(msg.data);
    switch (data.type) {
      case 'USER_ACTIVE':
        this.activeUsers = data.payload.users;
        sessionStorage.setItem('onlineUsers', JSON.stringify(this.activeUsers));
        break;
      case 'USER_INACTIVE':
        this.activeUsers = data.payload.users;
        sessionStorage.setItem('offlineUsers', JSON.stringify(this.activeUsers));
        break;
      case 'USER_LOGIN':
        this.activeUsers = data.payload.users;
        sessionStorage.setItem('userData', JSON.stringify(this.activeUsers));
        break;
      case 'USER_LOGOUT':
        this.activeUsers = data.payload.users;
        sessionStorage.removeItem('userData');
        break;
      case 'ERROR':
        break;
    }
  }

  authenticateUser(login: string, password: string) {
    const request = {
      id: '1',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };

    if (this.server) this.server.send(JSON.stringify(request));
  }

  logOut(login: string, password: string) {
    const request = {
      id: '1',
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };

    if (this.server) this.server.send(JSON.stringify(request));
  }
}

export default Requests;
