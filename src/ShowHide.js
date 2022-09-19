import React from './react';


class ShowHide extends React.Component {

    state = { show: true };

    toggle = () => {
        this.setState({ show: !this.state.show });
    }

    hide = () => this.setState({ show: false });

    render() {
        return <div>
            <div>
                {
                    this.state.show ?
                        <div>
                            <h1>This heading is shown</h1>
                            <button onClick={this.hide}>Hide</button>
                        </div> : null
                }
            </div>
            <div>
                <button onClick={this.toggle}>Toggle heading</button>
            </div>
        </div>
    }
}

export default ShowHide;
