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
    const dropToken = (row, column, player = "X") => {
        if (board[row][column].getValue() === "null") {
            board[row][column].addToken(player);
        }
        console.log(`Token ${player} has been added to row ${row} and column ${column}`)
    };

    const printBoard = () => {
        const boardPrint = board.map((row) => row.map((cell) => cell.getValue()));
        // for (let i = 0; i < row; i += 1) {
        //     for (let j = 0; j < column; j += 1) {
        //         // boardPrint.push(board[i][j].getValue());

        //     }
        // }
        console.log(boardPrint);
    };

    return {
        dropToken,
        printBoard
    }
})();
Gameboard.dropToken(0, 0, "x");
Gameboard.printBoard();
Gameboard.dropToken(0, 2, "0");
Gameboard.printBoard();
Gameboard.dropToken(1, 0, "x");
Gameboard.printBoard();

