import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import CharForm from "../charForm/CharForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id) => {
        setSelectedChar(id);
        console.log(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <CharList onSelectedChar={onSelectedChar} id={selectedChar} />
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage