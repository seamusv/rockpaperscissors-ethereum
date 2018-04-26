import React, {Component} from 'react'
import RockPaperScissors from '../build/contracts/RockPaperScissors.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import {GameSelector} from "./GameSelector";
import {CreateGame} from "./CreateGame";
import {JoinGame} from "./JoinGame";

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player1Address: null,
            player2Address: null,
            web3: null
        }
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                });
                results.web3.eth.getAccounts((error, accounts) => {
                    this.setState({
                        player1Address: accounts[0],
                        player2Address: accounts[1]
                    });
                });
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    _renderChoice(choice) {
        return (choice === 'create') ?
            <CreateGame web3={this.state.web3} you={this.state.player1Address} other={this.state.player2Address}/>
            :
            <JoinGame web3={this.state.web3} you={this.state.player2Address} other={this.state.player1Address}/>
    }

    render() {
        return (
            <div className="App">
                <GameSelector>
                    {choice => this._renderChoice(choice)}
                </GameSelector>
            </div>
        );
    }
}

export default App
