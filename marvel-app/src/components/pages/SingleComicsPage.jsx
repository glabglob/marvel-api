// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// import useMarvelService from '../../services/MarvelServices';
// import Spinner from "../spinner/Spinner";
// import Error from "../error/Error";
// import AppBanner from "../appBanner/AppBanner";


// const SingleComicsPage = () => {
//     const { comicsId } = useParams();
//     const [comics, setComics] = useState(null);
//     const { loading, error, getComics, clearError } = useMarvelService();

//     useEffect(() => {
//         updateComic()
//     }, [comicsId])

//     const updateComic = () => {
//         clearError();
//         getComics(comicsId)
//             .then(onComicLoaded)
//     }

//     const onComicLoaded = (comic) => {
//         setComic(comic);
//     }

//     const errorMessage = error ? <Error /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

//     return (
//         <>
//             <AppBanner />
//             {errorMessage}
//             {spinner}
//             {content}
//         </>
//     )
// }

// const View = ({ comic }) => {
//     const { title, description, pageCount, thumbnail, language, price } = comic;

//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img" />
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to="/comics" className="single-comic__back">Back to all</Link>
//         </div>
//     )
// }

// export default SingleComicsPage;