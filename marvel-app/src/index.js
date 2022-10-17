import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelServices';

import './style/style.scss';

const marvelService = new MarvelService();
marvelService.getAllChars().then(response => response.data.results.forEach(element => {
  console.log(element.name);
}))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

