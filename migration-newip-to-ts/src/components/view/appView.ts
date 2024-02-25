import News from './news/news';
import Sources from './sources/sources';
import {NewsItem} from "./news/news";
import {SourceItem} from "./sources/sources";

interface Data {
    articles?: NewsItem[];
    sources?: SourceItem[];
}

export class AppView {

    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data): void {
        const values = data.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Data): void {
        const values = data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
