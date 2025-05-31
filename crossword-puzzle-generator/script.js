document.addEventListener('DOMContentLoaded', () => {
    const wordClueInput = document.getElementById('word-clue-input');
    const generateBtn = document.getElementById('generate-btn');
    const printCrosswordBtn = document.getElementById('print-crossword-btn');
    const printAnswersBtn = document.getElementById('print-answers-btn');

    const crosswordGridContainer = document.getElementById('crossword-grid-container');
    const answerGridContainer = document.getElementById('answer-grid-container');

    const cluesAcrossList = document.getElementById('clues-across-list');
    const cluesDownList = document.getElementById('clues-down-list');
    const cluesAcrossListAnswers = document.getElementById('clues-across-list-answers');
    const cluesDownListAnswers = document.getElementById('clues-down-list-answers');

    const outputSection = document.getElementById('output-section');
    const messageArea = document.getElementById('message-area');

    const printableCrosswordArea = document.getElementById('printable-crossword-area');
    const printableAnswersArea = document.getElementById('printable-answers-area');

    const GRID_SIZE_INITIAL = 20;
    let grid = [];
    let placedWords = [];
    let currentClueNumber = 1;

    generateBtn.addEventListener('click', handleGeneration);
    printCrosswordBtn.addEventListener('click', () => printContent('crossword'));
    printAnswersBtn.addEventListener('click', () => printContent('answers'));

    function handleGeneration() {
        const inputText = wordClueInput.value.trim();
        if (!inputText) {
            showMessage('Please enter words and clues.', 'error');
            return;
        }

        const lines = inputText.split('\n');
        const wordsAndClues = lines.map(line => {
            const parts = line.split(':');
            if (parts.length !== 2) return null;
            const word = parts[0].trim().toUpperCase();
            const clue = parts[1].trim();
            if (!word || !clue) return null;
            return { word, clue, length: word.length };
        }).filter(item => item !== null);

        if (wordsAndClues.length === 0) {
            showMessage('Invalid input format. Use WORD:Clue.', 'error');
            return;
        }

        wordsAndClues.sort((a, b) => b.length - a.length);

        generateCrossword(wordsAndClues);
    }

    function initializeGrid(size) {
        grid = [];
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = null;
            }
        }
    }

    function generateCrossword(wordsAndClues) {
        placedWords = [];
        currentClueNumber = 1;
        let gridSize = GRID_SIZE_INITIAL;
        initializeGrid(gridSize);
        let allWordsPlaced = false;
        let attempts = 0;

        const firstWord = wordsAndClues[0];
        let startRow = Math.floor(gridSize / 2);
        let startCol = Math.floor((gridSize - firstWord.length) / 2);

        if (startCol < 0) {
            gridSize = firstWord.length + 4;
            initializeGrid(gridSize);
            startRow = Math.floor(gridSize / 2);
            startCol = 2;
        }

        placeWordOnGrid(firstWord.word, startRow, startCol, 'across', firstWord.clue);

        for (let i = 1; i < wordsAndClues.length; i++) {
            const currentWordObj = wordsAndClues[i];
            let placed = false;
            for (let j = 0; j < placedWords.length; j++) {
                const existingWord = placedWords[j];
                const intersection = findIntersection(currentWordObj.word, existingWord);
                if (intersection) {
                    let r = existingWord.row + intersection.existingWordIndex;
                    let c = existingWord.col - intersection.newWordIndex;
                    if (existingWord.direction === 'across') {
                        r = existingWord.row - intersection.newWordIndex;
                        c = existingWord.col + intersection.existingWordIndex;
                        if (canPlace(currentWordObj.word, r, c, 'down')) {
                            placeWordOnGrid(currentWordObj.word, r, c, 'down', currentWordObj.clue);
                            placed = true;
                            break;
                        }
                    } else {
                        r = existingWord.row + intersection.existingWordIndex;
                        c = existingWord.col - intersection.newWordIndex;
                        if (canPlace(currentWordObj.word, r, c, 'across')) {
                            placeWordOnGrid(currentWordObj.word, r, c, 'across', currentWordObj.clue);
                            placed = true;
                            break;
                        }
                    }
                }
            }
            if (!placed) {
                console.warn(`Could not easily place word: ${currentWordObj.word}`);
            }
        }

        let minRow = gridSize, maxRow = 0, minCol = gridSize, maxCol = 0;
        placedWords.forEach(pw => {
            minRow = Math.min(minRow, pw.row);
            maxRow = Math.max(maxRow, pw.direction === 'across' ? pw.row : pw.row + pw.word.length - 1);
            minCol = Math.min(minCol, pw.col);
            maxCol = Math.max(maxCol, pw.direction === 'down' ? pw.col : pw.col + pw.word.length - 1);
        });

        if (placedWords.length === 0) {
            minRow = 0; maxRow = -1;
        }


        renderGrid(crosswordGridContainer, minRow, maxRow, minCol, maxCol, false);
        renderGrid(answerGridContainer, minRow, maxRow, minCol, maxCol, true);

        renderClues();
        outputSection.style.display = 'block';
        printableCrosswordArea.style.display = 'block';
        printableAnswersArea.style.display = 'none';

        const unplacedCount = wordsAndClues.length - placedWords.length;
        if (unplacedCount > 0) {
            showMessage(`${placedWords.length} words placed. ${unplacedCount} words could not be placed with the current algorithm.`, 'error');
        } else {
            showMessage('Crossword generated successfully!', 'success');
        }
    }

    function findIntersection(newWord, existingWordObj) {
        for (let i = 0; i < newWord.length; i++) {
            for (let j = 0; j < existingWordObj.word.length; j++) {
                if (newWord[i] === existingWordObj.word[j]) {
                    return { newWordIndex: i, existingWordIndex: j, letter: newWord[i] };
                }
            }
        }
        return null;
    }

    function canPlace(word, r, c, direction) {
        if (r < 0 || c < 0) return false;

        for (let i = 0; i < word.length; i++) {
            let currentRow = r;
            let currentCol = c;

            if (direction === 'across') {
                currentCol += i;
            } else {
                currentRow += i;
            }

            if (currentRow >= grid.length || currentCol >= grid[0].length) return false;

            if (grid[currentRow][currentCol] !== null && grid[currentRow][currentCol].letter !== word[i]) {
                return false;
            }

            if (direction === 'across') {
                if ((currentRow > 0 && grid[currentRow - 1][currentCol] !== null && i < word.length) ||
                    (currentRow < grid.length - 1 && grid[currentRow + 1][currentCol] !== null && i < word.length)) {
                    if (grid[currentRow][currentCol] === null || grid[currentRow][currentCol].letter !== word[i]) {
                    }
                }
            } else {
                if ((currentCol > 0 && grid[currentRow][currentCol - 1] !== null && i < word.length) ||
                    (currentCol < grid[0].length - 1 && grid[currentRow][currentCol + 1] !== null && i < word.length)) {
                    if (grid[currentRow][currentCol] === null || grid[currentRow][currentCol].letter !== word[i]) {
                    }
                }
            }
        }
        return true;
    }


    function placeWordOnGrid(word, r, c, direction, clue) {
        const wordObj = { word, row: r, col: c, direction, clue, number: currentClueNumber };
        placedWords.push(wordObj);

        for (let i = 0; i < word.length; i++) {
            let currentRow = r;
            let currentCol = c;
            if (direction === 'across') {
                currentCol += i;
            } else {
                currentRow += i;
            }

            if (currentRow >= grid.length) {
                for (let k = grid.length; k <= currentRow; k++) grid.push(new Array(grid[0].length).fill(null));
            }
            if (currentCol >= grid[0].length) {
                for (let k = 0; k < grid.length; k++) {
                    for (let l = grid[k].length; l <= currentCol; l++) grid[k].push(null);
                }
            }


            if (grid[currentRow][currentCol] === null) {
                grid[currentRow][currentCol] = { letter: word[i], clues: [] };
            }
            if (i === 0) {
                grid[currentRow][currentCol].number = currentClueNumber;
            }
            grid[currentRow][currentCol].clues.push(wordObj);
        }
        currentClueNumber++;
    }

    function renderGrid(container, minRow, maxRow, minCol, maxCol, showAnswers) {
        container.innerHTML = '';
        const numRows = maxRow - minRow + 1;
        const numCols = maxCol - minCol + 1;

        if (numRows <= 0 || numCols <= 0) {
            container.style.gridTemplateColumns = '';
            container.innerHTML = "<p>No words could be placed to form a grid.</p>";
            return;
        }

        container.style.gridTemplateColumns = `repeat(${numCols}, 30px)`;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                const actualRow = minRow + i;
                const actualCol = minCol + j;

                if (actualRow >= 0 && actualRow < grid.length &&
                    actualCol >= 0 && actualCol < grid[0].length &&
                    grid[actualRow][actualCol]) {

                    const cellData = grid[actualRow][actualCol];
                    cell.classList.add('filled');
                    if (showAnswers) {
                        cell.textContent = cellData.letter;
                    }
                    if (cellData.number) {
                        const numSpan = document.createElement('span');
                        numSpan.classList.add('clue-number');
                        numSpan.textContent = cellData.number;
                        cell.appendChild(numSpan);
                    }
                } else {
                    cell.classList.add('empty-block');
                }
                container.appendChild(cell);
            }
        }
    }

    function renderClues() {
        cluesAcrossList.innerHTML = '';
        cluesDownList.innerHTML = '';
        cluesAcrossListAnswers.innerHTML = '';
        cluesDownListAnswers.innerHTML = '';


        const sortedPlacedWords = [...placedWords].sort((a, b) => a.number - b.number);

        sortedPlacedWords.forEach(pw => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<b>${pw.number}.</b> ${pw.clue} <i>(${pw.word})</i>`;

            const listItemPuzzle = document.createElement('li');
            listItemPuzzle.innerHTML = `<b>${pw.number}.</b> ${pw.clue}`;


            if (pw.direction === 'across') {
                cluesAcrossList.appendChild(listItemPuzzle);
                cluesAcrossListAnswers.appendChild(listItem.cloneNode(true));
            } else {
                cluesDownList.appendChild(listItemPuzzle);
                cluesDownListAnswers.appendChild(listItem.cloneNode(true));
            }
        });
    }

    function showMessage(msg, type = 'info') {
        messageArea.textContent = msg;
        messageArea.className = 'message';
        if (type === 'error') messageArea.classList.add('error');
        if (type === 'success') messageArea.classList.add('success');
    }

    function printContent(type) {
        const body = document.body;
        if (type === 'answers') {
            body.classList.add('printing-answers');
            body.classList.remove('printing-crossword');
            printableAnswersArea.style.display = 'block';
            printableCrosswordArea.style.display = 'none';
        } else {
            body.classList.add('printing-crossword');
            body.classList.remove('printing-answers');
            printableCrosswordArea.style.display = 'block';
            printableAnswersArea.style.display = 'none';
        }

        window.print();

        setTimeout(() => {
            body.classList.remove('printing-answers', 'printing-crossword');
            printableCrosswordArea.style.display = 'block';
            printableAnswersArea.style.display = 'none';
        }, 500);
    }

});