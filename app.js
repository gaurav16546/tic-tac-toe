function Cell() {
    let value = "null";

    const addToken = (player) => {
        value = player;
    };
    const getValue = () => value;

    return {
        addToken,
        getValue,
    };
}

const Gameboard = (function () {
    const row = 3;
    const column = 3;
    const board = [];
    for (let i = 0; i < row; i += 1) {
        board[i] = [];
        for (let j = 0; j < column; j += 1) {
            board[i][j] = [];
            board[i][j] = (Cell());
        }
    }

    // const checkGameCondition = (row, column, player) => {
    //     let availableCells = 0;
    //     for (let i = 0; i < row; i += 1) {
    //         for (let j = 0; j < column; j += 1) {
    //             if (board[i][j].getValue() === 0)
    //                 availableCells++;
    //         }
    //     }
    //     if (!availableCells) return;


    // }
    const dropToken = (row, column, player) => {
        if (board[row][column].getValue() === "null") {
            board[row][column].addToken(player);
            console.log(`Token ${player} has been added to row ${row} and column ${column}`)
        } else {
            console.log(`${row} by ${column} is already taken`)
        }
    };


    const printBoard = () => {
        const boardPrint = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardPrint);
    };

    return {
        dropToken,
        printBoard, board
    }
})();

const displayController = (function () {
    const playableCharacter = Player();
    const playRound = () => {
        const r = prompt("Enter the row");
        const c = prompt("Enter the column");
        Gameboard.dropToken(r, c, playableCharacter.returnToken());
        playableCharacter.switchPlayer();
        Gameboard.printBoard();
    }
    return {
        playRound
    }
})();

function Player(playerOne = "PlayerOne", playerTwo = "PlayerTwo") {
    const players = [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O"
        }
    ]
    let playerTurn = players[0];
    const switchPlayer = () => {
        playerTurn = playerTurn === players[0] ? players[1] : players[0];
        console.log(`${playerTurn.name}'s turn`);
    }
    const returnToken = () => playerTurn.token;
    return {
        switchPlayer, returnToken
    }
}
