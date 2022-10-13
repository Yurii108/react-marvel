import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
            break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />
            break;
        case 'confirmed':
            return <Component />
            break;
        case 'error':
            return <ErrorMessage />
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const [comicList, setComicList] = useState([]);
    const [offsetComic, setOffsetComic] = useState(100);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicEnded, setComicEnded] = useState(false);

    const { loading, error, getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offsetComic, true)
    }, [])

    const onRequest = (offsetComic, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offsetComic)
            .then(onComicListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicListLoaded = (newComicList) => {

        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComicList(comicList => [...comicList, ...newComicList]);
        setNewItemLoading(newItemLoading => false);
        setOffsetComic(offsetComic => offsetComic + 8);
        setComicEnded(comicEnded => ended);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price} $</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
             { setContent(process, () => renderItems(comicList), newItemLoading)}
            <button
                disabled={newItemLoading}
                onClick={() => onRequest(offsetComic)}
                className="button button__main button__long"
                style={{ 'display': comicEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;