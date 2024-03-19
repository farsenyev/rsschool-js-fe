import { l } from "vite/dist/node/types.d-FdqQ54oU";

class Start {
  container: HTMLElement | null;
  toLoadPage: Function;
  toGamePage: Function;
  name: string;
  surname: string;

  constructor(toLoadPage, toGamePage) {
    this.container = null;
    this.toLoadPage = toLoadPage;
    this.toGamePage = toGamePage;
    this.name = "";
    this.surname = "";
    this.init();
  }

  init() {
    const userData: object[] = JSON.parse(
      <string>localStorage.getItem("UserData"),
    );
    this.name = userData[userData.length - 1].name;
    this.surname = userData[userData.length - 1].surname;
    this.createHtml();
  }

  createHtml() {
    this.container = document.createElement("section");
    this.container.classList.add("start-container");

    const welcomeContainer: HTMLDivElement = document.createElement("div");
    welcomeContainer.classList.add("welcome-container");

    const title: HTMLElement = document.createElement("h1");
    title.innerHTML = "Puzzle Game";

    const treat: HTMLElement = document.createElement("h2");
    treat.classList.add("treatment");
    treat.innerHTML = `Welcome, ${this.name} ${this.surname}!`;

    const desc: HTMLElement = document.createElement("h4");
    desc.innerHTML = "A puzzle game, that improves your english skills";

    const startBtn: HTMLElement = document.createElement("button");
    startBtn.classList.add("start-btn");
    startBtn.innerHTML = "Start";
    startBtn.addEventListener("click", () => this.goPlay());

    welcomeContainer.append(title, treat, desc, startBtn);

    const loadOutBtn = document.createElement("button");
    loadOutBtn.innerHTML = "LogOut";
    loadOutBtn.addEventListener("click", () => this.logOut());
    this.container?.append(loadOutBtn, welcomeContainer);
  }

  goPlay() {
    this.toGamePage();
  }

  logOut() {
    localStorage.removeItem("UserData");
    this.toLoadPage();
  }

  getHtml(): Node {
    return this.container as Node;
  }
}

export default Start;
