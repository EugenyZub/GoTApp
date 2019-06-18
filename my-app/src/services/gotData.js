export default class GotData {
    constructor() {
        this._apiBase = '../../db.json';
    }

    async getResource() {
        const res = await fetch(`${this._apiBase}`);

        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status:  ${res.status}`);
        // }

        return await  console.log(res.json() );
    };

    // getAllCharacters() {
    //     return this.getResource('/');
    // }
}

const got = new GotData();

got.getResource();