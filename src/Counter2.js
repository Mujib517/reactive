import React from './react';

class Counter2 extends React.Component {

    state = { count: 10 };

    constructor(props) {
        super(props);

        this.state = { count: props.count };
    }

    render = () => {
        return <div>
            <h1>Count {this.state.count}</h1>
        </div>
    }
};

export default Counter2;
