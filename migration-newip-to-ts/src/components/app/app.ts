import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {ViewItem} from "../view/appView";

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e: Event) => this.controller.getNews(e as MouseEvent, (data: ViewItem) => this.view.drawNews(data)));
        this.controller.getSources((data: ViewItem) => this.view.drawSources(data));
    }
}

export default App;
