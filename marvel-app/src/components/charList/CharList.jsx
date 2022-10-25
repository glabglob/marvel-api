import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelServices';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(1541);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllChars} = useMarvelService();

    const onRequest = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
        getAllChars(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        
        newCharList.length < 9 ? ended = true : ended = false

        setCharList(charList => [...charList, ...newCharList]);
        setNewCharsLoading(newCharsLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    function dynamicCharList(charList) {
        let items = charList.map((item, i) => {

            let isAvailableImg = { 'objectFit': 'cover' };

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isAvailableImg = { 'objectFit': 'contain' };
            }

            const activeChar = item.id === props.id;
            const clazz = activeChar ? 'char__item char__item_selected' : 'char__item';

            return (
                <li className={clazz}
                    key={i}
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
    const spinner = loading && !newCharsLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {charCardsList}
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