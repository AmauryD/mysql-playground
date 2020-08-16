import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import config from '../config/environment';

export default class ApplicationController extends Controller {
    @tracked selectedDatabase;
    @tracked tables;
    @tracked result;
    @tracked errorMsg;
    @tracked query;

    @action
    async selectDatabase(database) {
        this.selectedDatabase = database;
        this.tables = await fetch(`${config.apiPath}/databases/${database}/tables`).then((res) => res.json());
    }

    @action
    async sendQuery(query) {
        this.errorMsg = null;
        let result = await fetch(`${config.apiPath}/sql-query/${this.selectedDatabase}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request : query
            })
        })
        
        let json = await result.json();

        if (result.status >= 400) {
            this.result = null;
            this.errorMsg = json.message;
        }

        this.result = json;
    }

    get canQuery() {
        return this.query && this.selectedDatabase;
    }

    get headers() {
        if(!this.result) return [];

        return Object.keys(this.result[0]);
    }

    get rows() {
        if(!this.result) return [];

        return this.result.map((row) => {
            return Object.values(row);
        });
    }
}
