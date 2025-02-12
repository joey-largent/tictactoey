
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    function getGrid() {
        return board;
    }

    function placeMarker(index, mark) {
        if (board[index] === '') {
            board[index] = mark;
            return true;
        }
        return false;
    }

    function reset() {
        for (i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return {
        getGrid,
        placeMarker,
        reset
    }
})();

const Player = (name, mark) => {
    return { name, mark };
};

const player1 = Player('Marina', 'O');
const player2 = Player('Andreas', 'X');

const GameController = (() => {
    let currentPlayer = player1;

    function playRound(index) {
        const player = getCurrentPlayer();
        const moveSuccessful = Gameboard.placeMarker(index, player.mark);
        if (!moveSuccessful) {
            return;
        }

        const winner = checkWinner();
        if (winner) {
            return `${player.name} wins!`;
        }

        switchPlayer();
        return `Next turn: ${getCurrentPlayer().name}`;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function checkWinner() {

    }

    function resetGame() {

    }

    return { playRound, getCurrentPlayer, checkWinner, resetGame };
})();