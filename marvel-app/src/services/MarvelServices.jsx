
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

    getAllChars = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformChar)
    }

    getChar = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`);
        return this._transformChar(res.data.results[0])
    }
    _transformChar = (char) => {

        if (!char.description) {
            char.description = 'There is no description' 
        }
        if (char.description.length > 150) {
            char.description = char.description.slice(0, 150) + '...'
        }

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;