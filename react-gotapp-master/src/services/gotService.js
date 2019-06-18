export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
        
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            if (res.status >= 400) {
                return res.status;
                //throw new Error(`Could not fetch ${url}, status:  ${res.status}`);
            }   
        }

        return await res.json();
    };

    //characters
    async getAllCharacters() {
        const allCharacters = await this.getResource('/characters?page=5&pageSize=10');
        return allCharacters.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        //return this._transformCharacter(character);
        return typeof character === typeof null ? this._transformCharacter(character) : character;
    }

    //books
    async getAllBooks() {
        const allBooks =  await this.getResource('/books?page=1');
        return allBooks.map(this._transformBook)
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    //books
    async getAllHouses() {
        const allHouse = await this.getResource('/houses?page=4');
        return allHouse.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
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

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestraWeapons: house.ancestraWeapons
        };
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        };
    }
}