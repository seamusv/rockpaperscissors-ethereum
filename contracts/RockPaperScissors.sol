pragma solidity ^0.4.0;

contract RockPaperScissors {

    address public player1;
    address public player2;

    byte public player1Choice;
    byte public player2Choice;

    bool public gameActive;

    event Winner(address player);
    event Draw();

    constructor() public {
        player1 = msg.sender;
        gameActive = true;
    }

    function makeChoice(byte choice) public {
        assert(gameActive);
        require(choice == 'r' || choice == 'p' || choice == 's');
        assert((msg.sender == player1 && player1Choice == 0x00) || (msg.sender != player1 && player2Choice == 0x00));

        if (msg.sender == player1) {
            player1Choice = choice;
        } else {
            player2 = msg.sender;
            player2Choice = choice;
        }

        checkGame();
    }

    function checkGame() private {
        if (player1Choice == 0x00 || player2Choice == 0x00) {
            return;
        }

        gameActive = false;
        if (player1Choice == player2Choice) {
            emit Draw();
        } else {
            if ((player1Choice == 'r' && player2Choice == 's') || (player1Choice == 'p' && player2Choice == 'r') || (player1Choice == 's' && player2Choice == 'p')) {
                emit Winner(player1);
            }
            if ((player2Choice == 'r' && player1Choice == 's') || (player2Choice == 'p' && player1Choice == 'r') || (player2Choice == 's' && player1Choice == 'p')) {
                emit Winner(player2);
            }
        }
    }
}