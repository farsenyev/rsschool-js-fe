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
  checkBtn: HTMLElement | null;
  currentSentenceIndex: number;
  nextLvl: Function;
  controls: HTMLElement | null;

  constructor(level: level, callback) {
    this.level = level;

    this.con = null;
    this.answerCon = null;
    this.checkBtn = null;
    this.controls = null;

    this.sentences = [];
    this.answer = [];
    this.round = 0;
    this.currentSentenceIndex = 0;

    this.nextLvl = callback;

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

    this.checkBtn = document.createElement("button");
    this.checkBtn.classList.add("check-btn");
    this.checkBtn.innerHTML = "Check";
    this.checkBtn.addEventListener("click", () =>
      this.checkAnswer(this.currentSentenceIndex),
    );

    this.controls = document.createElement("div");
    this.controls.classList.add("controls-con");
    this.controls?.append(this.checkBtn);

    this.con.append(this.answerCon, this.controls);
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
      if (i > 0) wordContainer.style.display = "none";
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

  checkAnswer(index) {
    if (this.answer.join(" ") === this.sentences[index].sentence) {
      if (this.round < this.level.words.length - 1) {
        this.round++;
        this.answer = [];
        this.showNextSentence();
      } else {
        this.winLevel();
      }
    }
  }

  showNextSentence(): void {
    this.currentSentenceIndex++;
    if (this.checkBtn) {
      this.checkBtn.innerHTML = "Check";
    }
    if (this.answerCon) {
      this.answerCon.innerHTML = "";
    }
    const next = document.getElementById(`word-con-${this.round}`);
    const prev = document.getElementById(`word-con-${this.round - 1}`);
    if (next) {
      next.style.display = "block";
    }
    if (prev) {
      prev.style.display = "none";
    }
  }

  winLevel() {
    this.currentSentenceIndex = 0;
    alert("You win!");
    this.nextLvl();
  }

  getHtml(): Node {
    return this.con as Node;
  }
}

export default Game;
