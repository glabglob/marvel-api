import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup, } from 'react-transition-group'
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicLoading, setNewComicLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    const onRequest = (offset, initial) => {
        initial ? setNewComicLoading(false) : setNewComicLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;

        newComicsList.length < 8 ? ended = true : ended = false

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicLoading(newComicLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
        console.log(offset);
        console.log(comicsList);
    }

    function dynamicComicsList(comicsList) {
        let items = comicsList.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={500} classNames="comics__item" tabIndex={0}>
                    <li className="comics__item">
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <TransitionGroup component={'ul'} className="comics__grid">
                {items}
            </TransitionGroup>
        )
    }

    const content = dynamicComicsList(comicsList);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading && !newComicLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                disabled={newComicLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;