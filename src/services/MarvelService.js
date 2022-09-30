import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {

    const { error, loading, request, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=9305bd22b8ae7e61414ce4f36b73001e';
    const _baseOffset = '315';
    const _offsetComic = '100';

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
        return res.data.results.map(_transformComec);

    }

    const _transformComec = (comec) => {
        return {
            id: comec.id,
            title: comec.title,
            price: comec.prices[0].price,
            thumbnail: comec.thumbnail.path + '.' + comec.thumbnail.extension,
            homepage: comec.urls[0].url
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

    return { error, loading, clearError, getAllCharacters, getCharacter, getAllComics }
}

export default useMarvelService;