import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = 'https://newsapi.org/v2/';
        const apiKey = '57e85156153d480589c1599bdea633c3';

        if (!apiUrl || !apiKey) {
            throw new Error('API_URL and/or API_KEY not provided in environment variables.');
        }

        super(apiUrl, {
            apiKey: apiKey,
        });
    }
}

export default AppLoader;
