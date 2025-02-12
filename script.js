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
        for (let i = 0; i < board.length; i++) {
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

const GameController = (() => {
    let player1 = Player("Player 1", "O");
    let player2 = Player("Player 2", "X");
    let currentPlayer = player1;

    function setPlayerNames (name1, name2) {
        player1 = Player(name1, "O");
        player2 = Player(name2, "X");
        currentPlayer = player1;
    }

    let gameOver = false;

    function playRound(index) {
        if (gameOver) return;

        const player = getCurrentPlayer();
        const moveSuccessful = Gameboard.placeMarker(index, player.mark);
        if (!moveSuccessful) {
            return;
        }

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            if (winner === "Berabere!") {
                return winner;
            } else {
                return `${winner} kazandı!`;
            }
            
        }

        switchPlayer();
        return `Sıradaki Oyuncu: ${getCurrentPlayer().name}`;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function checkWinner() {
        const checkStatus = Gameboard.getGrid();
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let combo of winningCombos) {
            const [a, b, c] = combo;

            if (checkStatus[a] && checkStatus[a] === checkStatus[b] && checkStatus[a] === checkStatus[c]) {
                return currentPlayer.name;
            }
        }

        if (!checkStatus.includes('')) {
            return "Berabere!";
        }

        return null;
    }

    function resetGame() {
        Gameboard.reset();
        currentPlayer = player1;
        gameOver = false;
    }

    return { playRound, getCurrentPlayer, checkWinner, resetGame, setPlayerNames };
})();



const boardElement = document.querySelector('#board');

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    boardElement.appendChild(cell);
}

document.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('cell')) {
        handleCellClick(clickedElement);
    } else if (clickedElement.id === "start-game") {
        handleStartGame();
    } else if (clickedElement.id === "reset") {
        handleReset();
    }
});

function handleCellClick(cell) {
    const index = cell.dataset.index;
    const result = GameController.playRound(index);

    if (result) {
        updateBoard();
    }
}

function handleStartGame() {
    
    const player1Name = document.querySelector('#player1-name').value || 'Oyuncu 1';
    const player2Name = document.querySelector('#player2-name').value || 'Oyuncu 2';

    GameController.setPlayerNames(player1Name, player2Name);

    document.querySelector('#player-setup').style.display = 'none';
    document.querySelector('#game-container').style.display = 'block';
    updateBoard();
}

function handleReset() {
    GameController.resetGame();

    document.querySelector('#player-setup').style.display = 'block';
    document.querySelector('#game-container').style.display = 'none';

    updateBoard();
}

function updateBoard() {
    const grid = Gameboard.getGrid();
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = grid[index];
    });

    const winner = GameController.checkWinner();
    const elementStatus = document.querySelector('#status');

    if (winner) {
        if (winner === "Berabere!") {
            elementStatus.textContent = "Berabere!";
        } else {
            elementStatus.textContent = `${winner} kazandı!`;
        }
    } else {
        elementStatus.textContent = `Sıradaki Oyuncu: ${GameController.getCurrentPlayer().name}`;
    }
}



