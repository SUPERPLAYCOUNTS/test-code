document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('status-message');
    const resetGameBtn = document.getElementById('reset-game-btn');
    const newSetupBtn = document.getElementById('new-setup-btn');

    const setupScreen = document.getElementById('setup-screen');
    const gameScreen = document.getElementById('game-screen');
    const chooseXBtn = document.getElementById('choose-x');
    const chooseOBtn = document.getElementById('choose-o');
    const difficultySelect = document.getElementById('difficulty');
    const startGameBtn = document.getElementById('start-game-btn');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer;
    let humanPlayer;
    let aiPlayer;
    let gameActive = false;
    let currentDifficulty;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    chooseXBtn.addEventListener('click', () => selectSymbol('X'));
    chooseOBtn.addEventListener('click', () => selectSymbol('O'));
    startGameBtn.addEventListener('click', startGame);

    function selectSymbol(symbol) {
        humanPlayer = symbol;
        aiPlayer = (symbol === 'X') ? 'O' : 'X';
        chooseXBtn.classList.toggle('selected', humanPlayer === 'X');
        chooseOBtn.classList.toggle('selected', humanPlayer === 'O');
    }

    function startGame() {
        if (!humanPlayer) {
            alert('Please choose a symbol (X or O) first!');
            return;
        }
        currentDifficulty = difficultySelect.value;
        setupScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        initializeGame();
    }

    function initializeGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
            cell.addEventListener('click', handleCellClick, { once: false });
        });

        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
        if (currentPlayer === aiPlayer && gameActive) {
            setTimeout(aiMove, 500);
        }
    }


    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive || currentPlayer === aiPlayer) {
            return;
        }

        makeMove(clickedCellIndex, humanPlayer);

        if (gameActive) {
            setTimeout(aiMove, 500);
        }
    }

    function makeMove(index, player) {
        if (board[index] === '' && gameActive) {
            board[index] = player;
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            cell.textContent = player;
            cell.classList.add(player.toLowerCase());

            if (checkWin(player)) {
                endGame(false, player);
            } else if (board.every(cell => cell !== '')) {
                endGame(true);
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                statusMessage.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin(player) {
        return winningConditions.some(condition => {
            const win = condition.every(index => board[index] === player);
            if (win) {
                condition.forEach(index => {
                    document.querySelector(`.cell[data-index='${index}']`).classList.add('winner');
                });
            }
            return win;
        });
    }

    function endGame(draw, winner = null) {
        gameActive = false;
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));

        if (draw) {
            statusMessage.textContent = "It's a Draw!";
        } else {
            statusMessage.textContent = `Player ${winner} Wins!`;
        }
    }

    function resetBoardState() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
            cell.removeEventListener('click', handleCellClick);
            cell.addEventListener('click', handleCellClick, { once: false });
        });
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;

        if (currentPlayer === aiPlayer && gameActive) {
            setTimeout(aiMove, 500);
        }
    }


    resetGameBtn.addEventListener('click', resetBoardState);
    newSetupBtn.addEventListener('click', () => {
        gameScreen.classList.add('hidden');
        setupScreen.classList.remove('hidden');
        humanPlayer = null;
        chooseXBtn.classList.remove('selected');
        chooseOBtn.classList.remove('selected');
    });


    function aiMove() {
        if (!gameActive || currentPlayer !== aiPlayer) return;

        let moveIndex = -1;

        if (currentDifficulty === 'hard') {
            moveIndex = findBestMove();
        } else if (currentDifficulty === 'medium') {
            moveIndex = findWinningMove(aiPlayer);
            if (moveIndex === -1) {
                moveIndex = findWinningMove(humanPlayer);
            }
            if (moveIndex === -1 && board[4] === '') {
                moveIndex = 4;
            }
            if (moveIndex === -1) {
                const corners = [0, 2, 6, 8].filter(index => board[index] === '');
                if (corners.length > 0) {
                    moveIndex = corners[Math.floor(Math.random() * corners.length)];
                }
            }
            if (moveIndex === -1) {
                moveIndex = getRandomEmptyCell();
            }
        } else {
            moveIndex = getRandomEmptyCell();
        }

        if (moveIndex !== -1) {
            makeMove(moveIndex, aiPlayer);
        }
    }

    function findWinningMove(player) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = player;
                if (checkWinCondition(board, player)) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        return -1;
    }

    function checkWinCondition(currentBoard, player) {
        return winningConditions.some(condition => {
            return condition.every(index => currentBoard[index] === player);
        });
    }

    function getRandomEmptyCell() {
        const emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
        return -1;
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let move = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(currentBoard, depth, isMaximizing) {
        if (checkWinCondition(currentBoard, aiPlayer)) return 10 - depth;
        if (checkWinCondition(currentBoard, humanPlayer)) return depth - 10;
        if (currentBoard.every(cell => cell !== '')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < currentBoard.length; i++) {
                if (currentBoard[i] === '') {
                    currentBoard[i] = aiPlayer;
                    let score = minimax(currentBoard, depth + 1, false);
                    currentBoard[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < currentBoard.length; i++) {
                if (currentBoard[i] === '') {
                    currentBoard[i] = humanPlayer;
                    let score = minimax(currentBoard, depth + 1, true);
                    currentBoard[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
});