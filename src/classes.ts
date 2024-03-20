import Login from "./login/login";
import Start from "./login/start";
import Game from "./app/game";

interface Data {
  rounds: Array<{
    words: Array<{
      audioExample: string;
      textExample: string;
      textExampleTranslate: string;
      id: number;
      word: string;
      wordTranslate: string;
    }>;
  }>;
  roundsCount: number;
}

class Puzzle {
  parent: HTMLElement | null;
  data: Data;
  login: Login | null;
  start: Start | null;
  game: Game | null;
  round: number;

  constructor(parent: HTMLElement, data: Data) {
    this.parent = parent;
    this.data = data;
    this.login = null;
    this.start = null;
    this.game = null;
    this.round = 0;

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
    const parentElement: HTMLElement | null = this.parent;
    if (parentElement) {
      parentElement.innerHTML = "";
      this.game = new Game(
        this.data.rounds[this.round],
        this.loadNextLvl.bind(this),
      );
      this.parent?.append(this.game.getHtml());
    }
  }

  loadNextLvl() {
    this.round++;
    this.loadGame();
  }
}

export default Puzzle;
