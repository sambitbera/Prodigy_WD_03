document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = cell.getAttribute('data-index');

        if (board[cellIndex] !== '' || !isGameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;

        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            messageElement.innerText = `Player ${currentPlayer} has won!`;
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            messageElement.innerText = 'Game is a draw!';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        isGameActive = true;
        cells.forEach(cell => cell.innerText = '');
        messageElement.innerText = '';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
