interface level {
  words: Array<{
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
  }>;
}

class Game {
  level: level;
  sentences: Array<object>;
  answer: Array<string>;
  round: number;
  con: HTMLElement | null;
  answerCon: HTMLElement | null;

  constructor(level: level) {
    this.level = level;

    this.con = null;
    this.answerCon = null;

    this.sentences = [];
    this.answer = [];
    this.round = 0;

    this.dataStructure();
  }

  dataStructure() {
    this.level.words.forEach((sentence) => {
      this.sentences.push({
        sentence: sentence.textExample as string,
        answer: sentence.textExample.split(" ") as Array<string>,
      });
    });
    this.createHtml();
  }

  createHtml() {
    this.con = document.createElement("section");
    this.con.classList.add("game-container");

    this.answerCon = document.createElement("div");
    this.answerCon.classList.add("answer-container");

    this.con.append(this.answerCon);
    this.sentences.forEach((sentence: object, i: number = 0) => {
      const wordContainer: HTMLElement = document.createElement("div");
      wordContainer.classList.add("word-container");
      wordContainer.setAttribute("id", `word-con-${i}`);
      const words: Array<string> = sentence.answer;
      words
        .sort(() => Math.random() - 0.5)
        .forEach((word: string) => {
          const sector: HTMLDivElement = document.createElement("div");
          sector.classList.add("word-sector");
          sector.innerHTML = word;
          const wordLength: number = sector.innerHTML.trim().split("").length;
          sector.style.width = `${50 + 5 * wordLength}px`;
          sector.addEventListener("click", this.clickHandler.bind(this));
          wordContainer.append(sector);
        });
      if (i > 0) wordContainer.classList.add("hide-word-con");
      this.con?.append(wordContainer);
      i++;
    });
  }

  clickHandler(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.parentElement === this.answerCon) {
      target.remove();
      const containerForWord: HTMLElement | null = document.getElementById(
        `word-con-${this.round}`,
      );
      if (containerForWord) {
        containerForWord.append(target);
      }
      const indexInAnswer = this.answer.indexOf(target.innerHTML);
      if (indexInAnswer !== -1) {
        this.answer.splice(indexInAnswer, 1);
      }
    } else {
      this.answer.push(target.innerHTML);
      this.answerCon?.append(target);
    }
  }

  getHtml(): Node {
    return this.con as Node;
  }
}

export default Game;
