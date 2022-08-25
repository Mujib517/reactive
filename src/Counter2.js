import React from './react';

class Counter2 extends React.Component {

    state = { count: 10, hasError: false };

    constructor(props) {
        super(props);

        this.state = { count: props.count };
    }

    inc = () => {
        this.setState({ count: this.state.count + 1 });
    }

    dec = () => {
        this.setState({ count: this.state.count - 1 });
    }

    showError = () => {
        this.setState({ hasError: !this.state.hasError });
    };

    render = () => {
        return this.state.hasError
            ? <div>
                <h1 style={{ color: 'red' }}>Failed to load, please try again</h1>
            </div> :
            <div>
                <h1 style={{ margin: '5px', color: 'red', borderBottom: '1px solid grey' }}>Count {this.state.count}</h1>
                <button class="btn" onClick={this.inc}>++</button>
                <button class="btn" onClick={this.dec}>--</button>
                <button class="btn" onClick={this.showError}>Apply Style</button>
            </div>;
    }
};

export default Counter2;
