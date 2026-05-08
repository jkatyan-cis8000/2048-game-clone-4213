/**
 * UI manager module for 2048 game
 * Renders the game board, score, and game status to the DOM
 */

// DOM elements
let gridContainer = null;
let scoreElement = null;
let bestScoreElement = null;
let messageElement = null;
let messageTextElement = null;

/**
 * Initialize the UI
 * Creates the grid cells in the DOM
 */
function initUI() {
    gridContainer = document.getElementById('grid-container');
    scoreElement = document.getElementById('score');
    bestScoreElement = document.getElementById('best-score');
    messageElement = document.getElementById('game-message');
    messageTextElement = document.getElementById('message-text');
    
    // Create grid cells
    gridContainer.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            gridContainer.appendChild(cell);
        }
    }
    
    // Setup restart button
    document.getElementById('restart-btn').addEventListener('click', function() {
        window.gameRestartRequested = true;
    });
}

/**
 * Render the grid to the DOM
 * Creates/updates tile elements based on grid values
 * @param {number[][]} grid - The current 4x4 grid
 */
function renderGrid(grid) {
    // Clear existing tiles
    const existingTiles = gridContainer.querySelectorAll('.tile');
    existingTiles.forEach(tile => tile.remove());
    
    // Create tiles for each non-zero cell
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const value = grid[row][col];
            if (value !== 0) {
                createTileElement(row, col, value);
            }
        }
    }
}

/**
 * Create a tile element at the specified position
 * @param {number} row - Row position (0-3)
 * @param {number} col - Column position (0-3)
 * @param {number} value - Tile value
 * @param {boolean} isNew - True if this is a new tile
 * @param {boolean} isMerged - True if this tile was merged
 */
function createTileElement(row, col, value, isNew = false, isMerged = false) {
    const cell = gridContainer.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    const tile = document.createElement('div');
    
    // Calculate position (cell is 100x100, gap is 15px)
    // Actually let's use absolute positioning with calculated offsets
    tile.className = 'tile';
    tile.textContent = value;
    
    // Base size is 100px with 15px gap
    // Position: col * (100 + 15) for col position
    // Row position: row * (100 + 15) for row position
    const cellSize = 100;
    const gap = 15;
    
    tile.style.left = (col * (cellSize + gap)) + 'px';
    tile.style.top = (row * (cellSize + gap)) + 'px';
    
    // Add size class
    if (value <= 2048) {
        tile.classList.add('tile-' + value);
    } else {
        tile.classList.add('tile-super');
    }
    
    if (isNew) {
        // Tile appears animation
        tile.style.transform = 'scale(0)';
        setTimeout(() => {
            tile.style.transform = 'scale(1)';
        }, 10);
    }
    
    if (isMerged) {
        tile.classList.add('tile-merged');
    }
    
    gridContainer.appendChild(tile);
}

/**
 * Update the score display
 * @param {number} score - Current score
 */
function renderScore(score) {
    scoreElement.textContent = score;
}

/**
 * Update the best score display
 * @param {number} tile - Highest tile value
 */
function renderHighestTile(tile) {
    bestScoreElement.textContent = tile;
}

/**
 * Show game over message
 */
function showGameOver() {
    messageTextElement.textContent = 'Game Over!';
    messageElement.classList.add('active');
}

/**
 * Show game won message
 */
function showGameWon() {
    messageTextElement.textContent = 'You Win!';
    messageElement.classList.add('active');
}

/**
 * Hide game message
 */
function hideMessage() {
    messageElement.classList.remove('active');
}

/**
 * Check if restart was requested
 * @returns {boolean} True if restart requested
 */
function checkRestartRequested() {
    const requested = window.gameRestartRequested || false;
    window.gameRestartRequested = false;
    return requested;
}

export {
    initUI,
    renderGrid,
    renderScore,
    renderHighestTile,
    showGameOver,
    showGameWon,
    hideMessage,
    checkRestartRequested,
    gridContainer
};
