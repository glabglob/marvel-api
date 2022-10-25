import { useHttp } from '../components/hooks/http.hook'

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c9f6db08a4d3cfbe250057b60fb6409b';
    const _baseCharsOffset = 210;
    const _baseComicsOffset = 210;
    
    const getAllChars = async (offset = _baseCharsOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar)
    }

    const getChar = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?limit=9&offset=${_baseCharsOffset}&${_apiKey}`);
        return _transformChar(res.data.results[0])
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComics = async (id) => {
        const res = await request(` ${_apiBase}comics/${id}?limit=8&offset=${_baseComicsOffset}&${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const _transformChar = (char) => {

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
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {

        if (!comics.description) {
            comics.description = 'There is no description';
        }

        if (!comics.prices.price) {
            comics.prices.price = 'It is not available now';
        } else {
            comics.prices.price = `${comics.prices.price} $`
        }

        if (!comics.textObjects.language) {
            comics.textObjects.language = 'En-Us';
        }

        if (!comics.pageCount) {
            comics.pageCount = 'There is no information about number of pages'
        }

        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language,
            price: comics.prices.price
        }
    }

    return { loading, error, getAllChars, getChar, clearError, getAllComics, getComics }
}

export default useMarvelService;