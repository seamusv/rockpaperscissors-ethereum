import React, {Component} from 'react'

export class PlayGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            choice: undefined,
            opponentChoice: undefined,
            winner: undefined,
        };

        this.choices = {
            r: "https://gateway.ipfs.io/ipfs/QmWwGdf42wQ5PHegRFaETb8VawzyDJFevyfw8ZFwBu5k7S",
            p: "https://gateway.ipfs.io/ipfs/QmV5TxgfHWE8jD49c2RAyy9vGGG8nb7uFPGQv6w2iAsRW8",
            s: "https://gateway.ipfs.io/ipfs/QmTE22joaEzPsxzjsy27UvegQpNwdqL9n6WMRAPX1kanVn",
        };

        this.winStates = {
            Y: "You won!!!",
            T: "They won...",
            D: "It's a draw!",
        };

        const drawEvent = this.props.contract.Draw();
        drawEvent.watch((err, e) => {
            this.setState({
                opponentChoice: this.state.choice,
                winner: "D",
            })
        });

        const winnerEvent = this.props.contract.Winner();
        winnerEvent.watch((err, e) => {
            this.props.contract.player1.call()
                .then(addr => {
                    return (addr === this.props.you) ? this.props.contract.player2Choice.call() : this.props.contract.player1Choice.call();
                })
                .then(choice => {
                    this.setState({
                        winner: e.args.player === this.props.you ? "Y" : "T",
                        opponentChoice: String.fromCharCode(parseInt(choice, 16)),
                    })
                })
        });
    }

    _chooseWeapon(choice) {
        this.setState({choice: choice});
        this.props.contract.makeChoice(choice, {from: this.props.you}).then(result => console.log("makeChoice result", result));
    }

    _displayChoices() {
        if (this.state.choice) {
            return <img src={this.choices[this.state.choice]}/>;
        }
        return ["r", "p", "s"].map(choice => <img key={choice} onClick={() => this._chooseWeapon(choice)}
                                                  src={this.choices[choice]}/>)
    }

    _renderResult() {
        if (this.state.opponentChoice) {
            return <img src={this.choices[this.state.opponentChoice]} />;
        }
        return ["r", "p", "s"].map(choice => <img key={choice} src={this.choices[choice]}/>);
    }

    render() {
        return (
            <div>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <div>YOU</div>
                        <div>
                            {this._displayChoices()}
                        </div>
                    </div>
                    <div className="pure-u-1-3">
                        <div>vs</div>
                    </div>
                    <div className="pure-u-1-3">
                        <div>THEM</div>
                        <div>
                            {this._renderResult()}
                        </div>
                    </div>
                </div>
                {this.state.winner && this.winStates[this.state.winner]}
            </div>
        )
    }
}