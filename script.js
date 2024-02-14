const board = document.getElementById('board');
const message = document.getElementById('message');
const overlay = document.querySelector('.overlay');
const overlayContent = document.querySelector('.overlay-content');
const newGameButton = document.querySelector('.new-game-button');

let currentPlayer = 'X';
let winner = false;

// Initialize the board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => cellClick(i));
    board.appendChild(cell);
}

function cellClick(index) {
    if (board.children[index].innerText === '' && !winner) {
        board.children[index].innerText = currentPlayer;
        if (checkWinner()) {
            showOverlay(`Player ${currentPlayer} wins!`);
            winner = true;
        } else if (checkDraw()) {
            showOverlay('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const cells = board.children;
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerText !== '' && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            highlightWinnerCells(combination);
            return true;
        }
    }

    return false;
}

function highlightWinnerCells(combination) {
    const cells = board.children;
    for (const index of combination) {
        cells[index].style.backgroundColor = '#8aff8a'; // Light green for winner cells
    }
}

function checkDraw() {
    for (const cell of board.children) {
        if (cell.innerText === '') {
            return false;
        }
    }
    return true;
}

function showOverlay(content) {
    overlayContent.innerHTML = `${content}<br><button class="new-game-button">New Game</button>`;
    overlay.style.display = 'flex';

    const newGameButtonOverlay = document.querySelector('.new-game-button');
    newGameButtonOverlay.addEventListener('click', () => {
        resetGame();
        hideOverlay();
    });
}

function hideOverlay() {
    overlay.style.display = 'none';
}

newGameButton.addEventListener('click', () => {
    resetGame();
    hideOverlay();
});

function resetGame() {
    winner = false;
    currentPlayer = 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;

    const cells = board.children;
    for (const cell of cells) {
        cell.innerText = '';
        cell.style.backgroundColor = '#fff';
    }
}
