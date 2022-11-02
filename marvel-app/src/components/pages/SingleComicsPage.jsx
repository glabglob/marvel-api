import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import AppBanner from '../appBanner/AppBanner';


import './singleComicsPage.scss';

const SingleComic = () => {

    const { comicsId } = useParams();
    const [comics, setComics] = useState(null);

    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComics();
        // eslint-disable-next-line
    }, [comicsId])

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const updateComics = () => {
        clearError();
        getComics(comicsId)
            .then(onComicsLoaded);
    }

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comics) ? <ViewContent comics={comics} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ViewContent = ({ comics }) => {

    const { title, description, pageCount, thumbnail, language, price } = comics;

    return (
        <>
            <AppBanner />
            <Helmet>
                <meta name="description" content={`${title} comics book`} />
                <title>{title}</title>
            </Helmet>
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount} pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}


export default SingleComic;