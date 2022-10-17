import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [top, setTop] = useState(0);

    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    }, [props.charId]);

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)

        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        setTop(e.target.documentElement.scrollTop)
    }

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const mySecondRef = useRef();

    return (
        <div className="char__info" ref={mySecondRef} style={top >= 600 ? { position: "absolute", top: `${top - 146}px` } : {}}>
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = data;
    const http = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let objectFit = thumbnail === http ? { 'objectFit': 'fill' } : null;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={objectFit} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;