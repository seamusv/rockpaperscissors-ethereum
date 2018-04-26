import React, {Component} from 'react'
import {Button} from 'react-pure';
import contract from "truffle-contract";
import RockPaperScissorsContract from '../build/contracts/RockPaperScissors.json'
import {PlayGame} from "./PlayGame";

export class JoinGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contract: undefined,
            address: undefined,
        }
    }

    _joinGame(address) {
        const rps = contract(RockPaperScissorsContract);
        rps.setProvider(this.props.web3.currentProvider);
        rps.at(address, {from: this.props.you, gas: 3000000}).then(instance => this.setState({contract: instance}));
    }

    render() {
        return (
            <div>
                <div className="pure-g">
                    <div className="pure-u">
                        Game address:
                        <input onChange={e => this.setState({address: e.target.value})}/>
                        {!this.state.contract && (
                            <Button onClick={() => this._joinGame(this.state.address)}>Join</Button>)}
                    </div>
                </div>
                {this.state.contract && (<PlayGame contract={this.state.contract} you={this.props.you}/>)}
            </div>
        )
    }
}