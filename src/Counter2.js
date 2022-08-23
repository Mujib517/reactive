import React from './react';

class Counter2 extends React.Component {

    state = { count: 10 };

    constructor(props) {
        super(props);

        this.state = { count: props.count };
    }

    inc = () => {
        console.log('inc...');
    }

    dec = () => {
        console.log('dec...');
    }

    render = () => {
        return <div>
            <h1>Count {this.state.count}</h1>
            <button class="btn" onClick={this.inc}>++</button>
            <button class="btn" onClick={this.dec}>--</button>
        </div>
    }
};

export default Counter2;
