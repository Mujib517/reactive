/** @jsx React.createElement */

import React from './react';
import ReactDOM from './react-dom';

const Image = () => {
    return <img
        width={300}
        height={200}
        src="https://www.91-img.com/gallery_images_uploads/3/d/3df5ca6a9b470f715b085991144a5b76e70da975.JPG?tr=h-550,w-0,c-at_max" />
};

const Counter = (props) => {
    return <h1>Count: {props.count}</h1>
};

const App = () => {
    return <div>
        <h1>Hello World</h1>
        <Image />
        <Counter count={10} />
    </div>
};

const root = document.getElementById('root');

ReactDOM.render(App, root);