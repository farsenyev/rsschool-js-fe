import "./style.css";
import Puzzle from "./classes";
import data from "./app/data";

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

const body: HTMLElement = document.body;
const puzzle = new Puzzle(body, <Data>data); // eslint-disable-line
export default puzzle;
