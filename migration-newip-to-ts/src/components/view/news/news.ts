import './news.css';

export interface NewsItem {
    author: string | null;
    source: {
        name: string;
    };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
}

class News {
    draw(data: NewsItem[]): void {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem) newsItem.classList.add('alt');
            }

            const newsMetaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
            if (newsMetaPhoto) newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
            if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;

            const newsMetaDate = newsClone.querySelector('.news__meta-date');
            if (newsMetaDate) {
                newsMetaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
            if (newsDescriptionTitle) newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource) newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent) newsDescriptionContent.textContent = item.description;

            const newsReadMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (newsReadMoreLink) newsReadMoreLink.setAttribute('href', item.url);

            fragment.appendChild(newsClone);
        });

        const newsElement = document.querySelector<HTMLElement>('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
