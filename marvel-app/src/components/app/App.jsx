import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, ComicsPage, Page404, SingleComicsPage } from '../pages/index';

import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='/comics/:comicsId' element={<SingleComicsPage />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;