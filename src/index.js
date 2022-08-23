/** @jsx React.createElement */

import Counter2 from './Counter2';
import Counter from './Counter';
import React from './react';
import ReactDOM from './react-dom';

import './App.css';
import AutoCounter from './AutoCounter';

const Image = () => {
    return <img
        width={300}
        height={200}
        src="https://www.91-img.com/gallery_images_uploads/3/d/3df5ca6a9b470f715b085991144a5b76e70da975.JPG?tr=h-550,w-0,c-at_max" />
};

const App = () => {
    return <div>
        <h1>Hello World</h1>
        <Image />
        <Counter count={10} />
        <Counter2 count={50} />
        <AutoCounter />
    </div>
};

const root = document.getElementById('root');

ReactDOM.render(App, root);