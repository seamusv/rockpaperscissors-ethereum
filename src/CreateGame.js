import React, {Component} from 'react'
import contract from 'truffle-contract';
import RockPaperScissorsContract from '../build/contracts/RockPaperScissors.json'
import {PlayGame} from "./PlayGame";

export class CreateGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            choice: "",
            contract: undefined,
            gameAddress: undefined,
        }
    }

    componentWillMount() {
        const rps = contract(RockPaperScissorsContract);
        rps.setProvider(this.props.web3.currentProvider);
        rps.new({from: this.props.you, gas: 3000000}).then(instance => this.setState({
            contract: instance,
            address: instance.address,
        }));
    }

    render() {
        return (
            <div>
                <div className="pure-g">
                    <div className="pure-u">
                        <div>Game Address: {this.state.address}</div>
                    </div>
                </div>
                {this.state.contract && (<PlayGame contract={this.state.contract} you={this.props.you}/>)}
            </div>
        )
    }
}