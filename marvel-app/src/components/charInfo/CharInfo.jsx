import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId])

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(loading => false);
    }

    const onCharLoading = () => {
        setLoading(loading => true);
    }

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        onCharLoading();
        marvelService.getChar(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <ViewContent char={char} /> : null;
    const skeleton = char || loading || error ? null : <Skeleton />;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const ViewContent = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let isAvailableImg = { 'objectFit': 'cover' };

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        isAvailableImg = { 'objectFit': 'contain' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={isAvailableImg} />
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
                {comics.length > 0 ? null : 'There is no  comics'}
                {
                    comics.map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
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
    charid: PropTypes.number,
}

export default CharInfo;