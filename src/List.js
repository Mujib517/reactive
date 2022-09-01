import React from "./react";


class List extends React.Component {

    state = { nodes: [1, 2] };

    addNode = () => {
        const newNodes = [...this.state.nodes];
        newNodes.push(this.state.nodes.length + 1);
        this.setState({ nodes: newNodes });
    }

    removeNode = () => {
        const newNodes = [...this.state.nodes];
        newNodes.pop();
        this.setState({ nodes: newNodes });
    }

    render() {
        return <div>
            <ul>
                {this.state.nodes.map((node, index) => <li>{node}</li>)}
            </ul>
            <div>
                <button onClick={this.addNode}>Add</button>
                <button onClick={this.removeNode}>Remove</button>
            </div>
        </div>
    }
}

export default List;
