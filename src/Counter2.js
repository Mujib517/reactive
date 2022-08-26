import React from './react';

class Counter2 extends React.Component {

    state = {
        count: 10, hasError: false,
        hasClass: false,
        hasStyles: false,
        changeParent: false
    };

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

    applyClass = () => {
        this.setState({ hasClass: true });
    };

    applyStyles = () => {
        this.setState({ hasStyles: true });
    };

    changeParent = () => {
        this.setState({ changeParent: !this.state.changeParent });
    };

    render = () => {
        return this.state.hasError
            ? <div>
                <h1 style={{ color: 'red' }}>Failed to load, please try again</h1>
            </div> :
            <div>
                {
                    this.state.changeParent ?

                        <div>
                            <h1>Child heading</h1>
                        </div> :
                        <span>
                            <h1>Child heading</h1>
                        </span>
                }
                <h1 style={{ margin: '5px', color: 'red', borderBottom: '1px solid grey' }}>Count {this.state.count}</h1>
                <button class="btn" onClick={this.inc}>++</button>
                <button class="btn" onClick={this.dec}>--</button>
                <button class="btn" onClick={this.showError}>Show Error</button>
                <button class={this.state.hasClass ? 'cls' : 'btn'} onClick={this.applyClass}>Apply class</button>
                <button style={this.state.hasStyles ? { color: 'green', border: '0' } : {}} onClick={this.applyStyles}>Apply styles</button>
                <button onClick={this.changeParent}>Change parent</button>
            </div>;
    }
};

export default Counter2;
