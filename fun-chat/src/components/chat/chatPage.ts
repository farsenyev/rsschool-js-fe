import './chatStyle.css';

class ChatPage {
  onLogout: Function;
  container: HTMLElement | null;

  constructor(callback: Function) {
    this.container = null;
    this.onLogout = callback;

    this.init();
  }

  init() {
    this.createHtml();
  }

  createHtml() {
    this.container = document.createElement('section');
    this.container.classList.add('chat-container');

    this.createHeader();
    this.createFooter();
  }

  createHeader() {
    const con = document.createElement('div');
    con.classList.add('chat-info-container');

    const user = document.createElement('h4');
    user.innerHTML = `User: (username)`;

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
