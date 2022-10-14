import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {

    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=9305bd22b8ae7e61414ce4f36b73001e';
    const _baseOffset = '315';
    const _offsetComic = '444';

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);

    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offsetComic = _offsetComic) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offsetComic}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'There is no description',
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
            price: comic.prices[0].price,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            homepage: comic.urls[0].url,
            language: comic.textObjects.language || 'en-us',
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 230)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        clearError,
        getAllCharacters,
        getCharacter,
        getComic,
        getAllComics,
        getCharacterByName,
        process,
        setProcess
    }
}

export default useMarvelService;