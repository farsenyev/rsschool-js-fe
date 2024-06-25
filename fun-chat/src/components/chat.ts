import Log from './log/log';
import ChatPage from './chat/chatPage';

class Chat {
  mainContainer: HTMLElement | null;
  parent: HTMLElement;
  log: Log | null;
  chat: ChatPage | null;
  infoContainer: HTMLElement | null;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.mainContainer = null;
    this.log = null;
    this.chat = null;
    this.infoContainer = null;

    this.init();
  }

  init() {
    this.createHtml();

    this.loadLog();
  }

  createHtml() {
    this.mainContainer = document.createElement('section');
    this.mainContainer.classList.add('main-container');

    this.infoContainer = document.createElement('div');
    this.infoContainer.classList.add('info-container');
    this.infoContainer.classList.add('hide-info');

    this.fillInfo();

    const about = document.createElement('button');
    about.classList.add('about-btn');
    about.innerHTML = 'About';
    about.addEventListener('click', () => this.showInfo());

    this.parent.append(this.infoContainer, about, this.mainContainer);
  }

  fillInfo() {
    const name = document.createElement('h3');
    name.innerHTML = 'Author: Ted Arsenev';

    const course = document.createElement('h4');
    course.innerHTML = 'RSSCHOOL 2023 Q4';

    const info = document.createElement('h4');
    info.innerHTML = 'This is fun chat. App for communication. The prototype of social network';

    const hide = document.createElement('h6');
    hide.innerHTML = 'Close this window by click About button';

    this.infoContainer?.append(name, course, info, hide);
  }

  showInfo() {
    if (this.infoContainer?.classList.contains('hide-info')) {
      this.infoContainer?.classList.remove('hide-info');
    } else if (!this.infoContainer?.classList.contains('hide-info')) {
      this.infoContainer?.classList.add('hide-info');
    }
  }

  loadLog() {
    this.clearMainContainer();
    this.log = new Log(this.loadMain.bind(this));
    this.mainContainer?.append(this.log.getHtml());
  }

  loadMain() {
    this.clearMainContainer();
    this.chat = new ChatPage(this.loadLog.bind(this));
    this.mainContainer?.append(this.chat.getHtml());
  }

  clearMainContainer() {
    if (this.mainContainer) {
      this.mainContainer.innerHTML = '';
    }
  }
}

export default Chat;
