import React from './react';
import ReactDOM from './react-dom';

const Image = () => {
    const img = React.createElement('img', { width: 300, height: 200, src: 'https://www.91-img.com/gallery_images_uploads/3/d/3df5ca6a9b470f715b085991144a5b76e70da975.JPG?tr=h-550,w-0,c-at_max' });

    const div = React.createElement('div', {}, [img]);
    return div;
};

const App = () => {
    const h1 = React.createElement('h1', {}, 'Hello World');
    const div = React.createElement('div', {}, [h1, Image]);
    return div;
};

const root = document.getElementById('root');

ReactDOM.render(App, root);