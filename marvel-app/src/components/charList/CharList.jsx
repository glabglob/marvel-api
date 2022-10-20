import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelServices';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newCharsLoading: false,
        offset: 1541,
        charEnded: false
    }

    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllChars(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({ newCharsLoading: true });
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => (
            {
                charList: [...charList, ...newCharList],
                loading: false,
                newCharsLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
        ));
    }

    componentDidMount() {
        this.onRequest();
    }

    dynamicCharList(charList) {
        let items = charList.map((item) => {

            let isAvailableImg = { 'objectFit': 'cover' };

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isAvailableImg = { 'objectFit': 'contain' };
            }

            const activeChar = item.id === this.props.id;
            const clazz = activeChar ? 'char__item char__item_selected': 'char__item';

            return (
                <li className={clazz}
                    key={item.id}
                    onClick={() => this.props.onSelectedChar(item.id)}
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

    render() {

        const { charList, loading, error, newCharsLoading, offset, charEnded } = this.state;
        const charCardsList = this.dynamicCharList(charList)
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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.protoTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;