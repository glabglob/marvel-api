
class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=c9f6db08a4d3cfbe250057b60fb6409b';

    getResource = async (url) => {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Coud not fetch ${url}, status: ${response.status}`)
        }

        return await response.json()
    }

    getAllChars = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getChar = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`);
    }
}

export default MarvelService;