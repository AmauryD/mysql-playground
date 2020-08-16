import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from '../config/environment';

export default class ApplicationRoute extends Route {
    async model() {
        const databases = await fetch(`${config.apiPath}/databases`).then((res) => res.json());


        return {
            databases
        }
    }
}
