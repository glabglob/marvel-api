import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelServices';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(1541);
    const [charEnded, setCharEnded] = useState(false);


    const marvelService = new MarvelService();

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllChars(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewCharsLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewCharsLoading(newCharsLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, [])

    function dynamicCharList(charList) {
        let items = charList.map((item) => {

            let isAvailableImg = { 'objectFit': 'cover' };

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isAvailableImg = { 'objectFit': 'contain' };
            }

            const activeChar = item.id === props.id;
            const clazz = activeChar ? 'char__item char__item_selected' : 'char__item';

            return (
                <li className={clazz}
                    key={item.id}
                    onClick={() => props.onSelectedChar(item.id)}
                    tabIndex={0}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={isAvailableImg}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const charCardsList = dynamicCharList(charList)

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? charCardsList : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                disabled={newCharsLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.protoTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;