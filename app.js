function Cell() {
    let value = 0;

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
            board[i][j].push(Cell());
        }
    }
    function test() {
        console.log(board);
    }
    return {
        test,
    };
})();
Gameboard.test();
