import './chatStyle.css';

class ChatPage {
  onLogout: Function;
  container: HTMLElement | null;
  name: string | null;

  constructor(callback: Function) {
    this.container = null;
    this.onLogout = callback;
    this.name = '';

    this.init();
  }

  init() {
    this.getName()
    this.createHtml();
  }

  getName(){
    this.name = localStorage.getItem('username');
  }

  createHtml() {
    this.container = document.createElement('section');
    this.container.classList.add('chat-container');

    this.createHeader();
    this.createMainContainer()
    this.createFooter();
  }

  createHeader() {
    const con = document.createElement('div');
    con.classList.add('chat-info-container');

    const user = document.createElement('h4');
    user.innerHTML = `User: ${this.name}`;

    const project = document.createElement('h4');
    project.innerHTML = 'Fun Chat';

    const logOut = document.createElement('button');
    logOut.innerHTML = 'Logout';
    logOut.addEventListener('click', () => {
      //TODO: logout user
      this.onLogout();
    });

    con.append(user, project, logOut);
    this.container?.append(con);
  }

  createMainContainer(){
    const con = document.createElement('div');
    con.classList.add('main-chat-container');

    const users = document.createElement('div');
    users.classList.add('users-container');

    const search = document.createElement('input');
    search.classList.add('search-user');
    //TODO: make search by name
    // search.addEventListener()

    const usrCon = document.createElement('div');
    usrCon.classList.add('users');

    this.createUser(usrCon)

    const msgs = document.createElement('div');
    msgs.classList.add('messages');

    const messageCon = document.createElement('div');
    messageCon.classList.add('message-container');

    const textCon = document.createElement('div');
    textCon.classList.add('text-con');

    const msgText = document.createElement('input');
    msgText.classList.add('msg-text');
    msgText.placeholder = 'Write text...';

    const sendBtn = document.createElement('button');
    sendBtn.classList.add('send-btn');
    sendBtn.innerHTML = '>';
    sendBtn.addEventListener('click', ()=>{})

    users.append(search, usrCon);
    textCon.append(msgText, sendBtn)
    msgs.append(messageCon, textCon)
    con.append(users, msgs);

    this.container?.append(con)
  }

  createUser(parent){
    const userCon = document.createElement('div');
    userCon.classList.add('user');

    const userStatus = document.createElement('div');
    userStatus.classList.add('user-status');
    //TODO: 'offline-user' css class for offline user

    const userName = document.createElement('h5');
    userName.classList.add('username');
    userName.innerHTML = `${this.name}`

    userCon.append(userStatus, userName)
    parent.append(userCon)
  }

  createFooter() {
    const con = document.createElement('div');
    con.classList.add('chat-info-container');

    const logo = document.createElement('img');
    logo.classList.add('school-logo');
    logo.src = '../assets/img/logo.png';

    const school = document.createElement('h4');
    school.innerHTML = 'RSSCHOOL';

    const author = document.createElement('h4');
    author.innerHTML = 'Ted Arsenev';

    const linkToGH = document.createElement('a');
    linkToGH.classList.add('link-to-gh');
    linkToGH.innerHTML = 'GitHub';
    linkToGH.href = 'https://github.com/farsenyev';

    const year = document.createElement('h4');
    year.innerHTML = '2024';

    con.append(logo, school, author, linkToGH, year);

    this.container?.append(con);
  }

  getHtml(): Node {
    return this.container as Node;
  }
}

export default ChatPage;
