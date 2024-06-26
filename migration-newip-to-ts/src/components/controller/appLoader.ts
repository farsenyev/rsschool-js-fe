import Loader from './loader';
import { ViewItem } from "../view/appView";

enum API {
    url = 'https://newsapi.org/v2/',
    key = '57e85156153d480589c1599bdea633c3',
}

class AppLoader extends Loader<ViewItem> {
    constructor() {
        if (!API.url || !API.key) {
            throw new Error('API_URL and/or API_KEY not provided in environment variables.');
        }

        super(API.url, {
            apiKey: API.key,
        });
    }
}

export default AppLoader;
