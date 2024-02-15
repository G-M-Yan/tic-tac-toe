function Gameboard() {
    this.grid = [];

    this.initializeGrid = function () {
        for (let i = 0; i < 9; i++) {
            this.grid.push(null);
        }
    };

    this.makeMove = function (index, marker) {
        if (index >= 0 && index < this.grid.length && this.grid[index] === null) {
            this.grid[index] = marker;
            return true;
        } else {
            return false;
        }
    };

    this.checkWinner = function () {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winCombinations) {
            const [a, b, c] = combination;
            if (this.grid[a] !== null && this.grid[a] === this.grid[b] && this.grid[a] ===  this.grid[c]) {
                return this.grid[a];
            }
        }

        return null;
    };
}

const gameboard = new Gameboard();
gameboard.initializeGrid();

let currentPlayer = 'X';

function handleClick(event) {
    const cellIndex = parseInt(event.target.getAttribute('id'));
    const moveMade = gameboard.makeMove(cellIndex, currentPlayer);

    if (moveMade) {
        event.target.textContent = currentPlayer;
        const winner = gameboard.checkWinner();
        if (winner) {
            displayWinner(winner);
            cells.forEach(cell => {
                cell.removeEventListener('click', handleClick);
            })
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}

function displayWinner(winner) {
    const winnerMessage = document.querySelector('h1');
    winnerMessage.textContent = `${winner} Wins!`;
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', function () {
    window.location.reload();
})