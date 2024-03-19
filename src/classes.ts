import Login from "./login/login";
import Start from "./login/start";
import { b } from "vite/dist/node/types.d-FdqQ54oU";

// interface Data {
//     rounds: Array<{
//         words: Array<{
//             audioExample: string;
//             textExample: string;
//             textExampleTranslate: string;
//             id: number;
//             word: string;
//             wordTranslate: string;
//         }>;
//     }>,
//     roundsCount: number;
// }

class Puzzle {
  parent: HTMLElement | null;
  data: object;
  login: Login | null;
  loginBtn: HTMLElement | null;
  start: Start | null;
  startBtn: HTMLElement | null;

  constructor(parent: HTMLElement, data: object) {
    this.parent = parent;
    this.data = data;
    this.login = null;
    this.loginBtn = null;
    this.start = null;
    this.startBtn = null;

    this.init();
  }

  init() {
    this.loadLogin();
  }

  loadLogin() {
    const parentElement: HTMLElement | null = this.parent;
    if (parentElement) {
      parentElement.innerHTML = "";
      this.login = new Login(this.loadStart.bind(this));
      this.parent?.append(this.login.getHtml());
    }
  }

  loadStart() {
    const parentElement: HTMLElement | null = this.parent;
    if (parentElement) {
      parentElement.innerHTML = "";
      this.start = new Start(
        this.loadLogin.bind(this),
        this.loadGame.bind(this),
      );
      this.parent?.append(this.start.getHtml());
    }
  }

  loadGame() {
    console.log("woooooork");
  }
}

export default Puzzle;
