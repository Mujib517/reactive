import React from './react';

class AutoCounter extends React.Component {

    state = { count: 1 };

    constructor() {
        super();
        setInterval(() => {
            console.log('updating...');
            this.setState({ count: this.state.count + 1 });
        }, 3000);
    }

    render() {
        return <div>
            <h1>Count: {this.state.count}</h1>
        </div>
    }
}

export default AutoCounter;
