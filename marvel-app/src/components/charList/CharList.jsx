import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        });
    }

    componentDidMount() {
        this.marvelService.getAllChars()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    dynamicCharList(charList) {
        let items = charList.map((item) => {
            let isAvailableImg = { 'objectFit': 'cover' };

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isAvailableImg = { 'objectFit': 'contain' };
            }
            return (
                <li className="char__item" key={item.id} onClick={() => this.props.onSelectedChar(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={isAvailableImg} />
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

        const { charList, loading, error } = this.state;
        const charCardsList = this.dynamicCharList(charList)
        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? charCardsList : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;