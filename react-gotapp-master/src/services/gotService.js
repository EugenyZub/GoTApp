export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:  ${res.status}`);
        }

        return await res.json();
    };

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    //books
    getAllBooks() {
        return this.getResource('/books?page=1');
    }
    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    //books
    getAllHouses() {
        return this.getResource('/houses?page=4');
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        };
    }
}