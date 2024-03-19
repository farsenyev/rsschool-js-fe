import "./style.css";
import Puzzle from "./classes";
import data from "./app/data";

const body: HTMLElement = document.body;
const puzzle = new Puzzle(body, data); // eslint-disable-line
