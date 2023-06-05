function Cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    };
    const getValue = () => value;

    return {
        addToken,
        getValue,
    };
}
function Player(playerOne, playerTwo) {
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
        // console.log(`${playerTurn.name}'s turn`);
    }
    // const currentPlayer = () => playerTurn.name;
    const returnToken = () => playerTurn.token;
    const returnName = () => playerTurn.name;
    return {
        switchPlayer, returnToken, returnName
    }
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


    const dropToken = (row, column, player) => {
        if (board[row][column].getValue() === "") {
            board[row][column].addToken(player);
            // console.log(`Token ${player} has been added to row ${row} and column ${column}`)

            return true;
        } else {
            // console.log(`${row} by ${column} is already taken`);
            return false;
        }
        // _checkGameCondition(row, column, player);
    };


    const printBoard = () => {
        const boardPrint = board.map((row) => row.map((cell) => cell.getValue()));
        // console.log(boardPrint);
    };
    const returnBoard = () => board;
    return {
        dropToken,
        printBoard,
        returnBoard
    }
})();

// const displayController = (function () {

// })();

const screenController = (e) => {
    e.preventDefault();
    const cellArray = [];
    const messageBox = document.querySelector(".message");
    // const playableCharacter = Player();
    const firstName = document.getElementById("name1").value;
    const secondName = document.getElementById("name2").value;
    const game = Player(firstName, secondName);
    const turnDiv = document.querySelector(".turn");
    const restartDiv = document.querySelector(".restart");
    const gameBox = document.querySelector(".box");
    const playerForm = document.querySelector("form");
    gameBox.style.display = "grid";
    playerForm.style.display = "none";
    const _playRound = (rowSelect, columnSelect) => {
        // const r = prompt("Enter the row");
        // const c = prompt("Enter the column");
        if (Gameboard.dropToken(rowSelect, columnSelect, game.returnToken()) && _checkFurtherGameplay(rowSelect, columnSelect, game)) {
            game.switchPlayer();
            // Gameboard.printBoard();
        }
    }
    const _checkFurtherGameplay = (row, column, player) => {
        let gameCondition = _checkGameCondition(row, column, player);
        if (!gameCondition) {
            // console.log("Game is tied");
            gameBox.removeEventListener('click', _clickHandlerBoard);
            turnDiv.style.display = "none";
            tiedMessage();
            // Gameboard.printBoard();
            return false;
        } else if (gameCondition.length === 0) {
            return true;
        }
        else if (gameCondition.length === 3) {
            turnDiv.style.display = "none";
            _winMessage();
            gameBox.removeEventListener('click', _clickHandlerBoard);
            // console.log(`Winning cell are ${gameCondition}`);
            // Gameboard.printBoard();
            return false;
        } else {
            return true;
        }
    }

    const _checkGameCondition = (row, column, player) => {
        let availableCells = 0;
        const board = Gameboard.returnBoard();
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                if (board[i][j].getValue() === '')
                    availableCells++;
            }
        }

        if (availableCells <= 4 && availableCells >= 0) {
            for (let i = 0; i < 3; i++) {
                if (board[i][column].getValue() === player.returnToken()) {
                    cellArray.push([i, column]);
                }
            }
            if (cellArray.length === 3) {
                return cellArray;
            }
            cellArray.length = 0;
            for (let i = 0; i < 3; i++) {
                if (board[row][i].getValue() === player.returnToken()) {
                    cellArray.push([row, i]);
                }
            }
            if (cellArray.length === 3) {
                return cellArray;
            }
            cellArray.length = 0;
            if (board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()) {
                cellArray.push([0, 0], [1, 1], [2, 2]);
                return cellArray;
            }
            if (board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue()) {
                cellArray.push([0, 2], [1, 1], [2, 0]);
                return cellArray;
            }

            cellArray.length = 0;
            if (availableCells === 0) {
                return;
            }

            return cellArray;
        }

        return true;

    }
    const _winMessage = () => {
        messageBox.textContent = `${game.returnName()}' won`
        // winningCells();
        // console.log(`Game won by ${playableCharacter.returnName()}`);
    }
    const tiedMessage = () => {
        messageBox.textContent = "Game is tied";
    }

    // const winningCells = () => {
    //     _updateScreen();
    //     // let value = _checkFurtherGameplay();
    //     for (let i = 0; i < cellArray.length; i++) {
    //         let rowValue = cellArray[i][0];
    //         let columnValue = cellArray[i][1];
    //         let boxes = document.querySelector(`[data-row='${rowValue}'][data-column='${columnValue}']`);
    //         // boxes.style.backgroundColor = "red";
    //         // boxes.style.display = "none";
    //         // console.log(boxes);
    //     }

    // }
    // }
    // return {
    //     _playRound
    // }

    const _updateScreen = () => {
        gameBox.textContent = "";
        const board = Gameboard.returnBoard();

        turnDiv.textContent = `${game.returnName()}' turn`;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const boxCell = document.createElement("button");
                boxCell.classList.add("cell");
                boxCell.dataset.row = i;
                boxCell.dataset.column = j;
                boxCell.textContent = board[i][j].getValue();
                gameBox.appendChild(boxCell);
            }
        } ``
        // game.switchPlayer();
    }

    function _clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        _playRound(selectedRow, selectedColumn);
        _updateScreen();

    }

    gameBox.addEventListener("click", _clickHandlerBoard);
    _updateScreen();

};
document.getElementById("give").addEventListener('submit', screenController, { once: true });
// document.getElementById










