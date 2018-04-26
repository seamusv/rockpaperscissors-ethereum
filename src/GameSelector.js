import React, {Component} from 'react'
import {Button} from 'react-pure';

export class GameSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            choice: undefined,
        }
    }

    _renderButtons() {
        return (
            <div className="pure-g">
                <div className='pure-u-1-3'>
                    <div className="pure-u-1-3">
                        <Button onClick={() => this.setState({choice: "create"})}>Create Game</Button>
                    </div>
                    <div className="pure-u-1-3">
                        <Button onClick={() => this.setState({choice: "join"})}>Join Game</Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (this.state.choice && this.props.children(this.state.choice)) || this._renderButtons();
    }
}