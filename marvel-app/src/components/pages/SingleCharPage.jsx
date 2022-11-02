import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import AppBanner from '../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {

    const { charId } = useParams();
    const [char, setChar] = useState(null);

    const { loading, error, getChar, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        getChar(charId)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <ViewContent char={char} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ViewContent = ({ char }) => {

    const { thumbnail, name, description } = char

    return (
        <>
            <AppBanner />
            <div className="single-char">
                <img src={thumbnail} alt={name} className="single-char__char-img" />
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
                <Link to="/" className="single-char__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleCharPage;