/**
 * Main controller for 2048 game
 * Coordinates all modules and handles game initialization
 */

import { initInput, destroyInput } from './input.js';
import { 
    getGrid, 
    getScore, 
    getHighestTile, 
    isGameOver, 
    isGameWon, 
    resetGame 
} from './game.js';
import {
    initUI,
    renderGrid,
    renderScore,
    renderHighestTile,
    showGameOver,
    showGameWon,
    hideMessage,
    checkRestartRequested
} from './ui.js';

// Current game state
let currentScore = 0;
let currentHighestTile = 0;

/**
 * Initialize and start the game
 */
function initGame() {
    // Initialize UI
    initUI();
    
    // Get initial state
    currentScore = getScore();
    currentHighestTile = getHighestTile();
    
    // Render initial state
    renderGrid(getGrid());
    renderScore(currentScore);
    renderHighestTile(currentHighestTile);
    
    // Setup input handling
    initInput(handleMove);
    
    // Setup restart listener
    setupRestartListener();
}

/**
 * Handle a move in the given direction
 * @param {number} direction - Direction to move (0=up, 1=right, 2=down, 3=left)
 */
function handleMove(direction) {
    // Get old state for comparison
    const oldGrid = getGrid();
    const oldScore = getScore();
    const oldHighest = getHighestTile();
    
    // Perform the move
    const moveResult = window.gameModule ? window.gameModule.makeMove(direction) : { moved: false };
    
    // Re-import game module for makeMove
    const game = window.gameModule || {};
    
    // Check if tile moved
    let moved = false;
    const newGrid = getGrid();
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (oldGrid[row][col] !== newGrid[row][col]) {
                moved = true;
                break;
            }
        }
        if (moved) break;
    }
    
    if (moved) {
        // Get the score from game module
        currentScore = getScore();
        currentHighestTile = getHighestTile();
        
        // Update UI with animation
        updateUIWithAnimation(oldGrid, newGrid);
        
        // Check game over
        if (isGameOver()) {
            showGameOver();
        }
        
        // Check game won
        if (isGameWon()) {
            showGameWon();
        }
    }
}

/**
 * Update UI with animation for tile movement
 * @param {number[][]} oldGrid - Previous grid state
 * @param {number[][]} newGrid - Current grid state
 */
function updateUIWithAnimation(oldGrid, newGrid) {
    const scoreElement = document.getElementById('score');
    const bestElement = document.getElementById('best-score');
    
    // Render new grid
    renderGrid(newGrid);
    scoreElement.textContent = getScore();
    bestElement.textContent = getHighestTile();
}

/**
 * Setup restart button listener
 */
function setupRestartListener() {
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', function() {
        hideMessage();
        resetGame();
        currentScore = 0;
        currentHighestTile = 0;
        renderGrid(getGrid());
        renderScore(0);
        renderHighestTile(0);
    });
}

// Expose game module for external access
window.gameModule = window.gameModule || {
    makeMove: null
};

// Make the game module's makeMove available
import { makeMove } from './game.js';

// Override makeMove to be accessible
const originalMakeMove = window.gameModule.makeMove;

// Create a temporary export of the function
function tempExportMakeMove() {
    return makeMove;
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

export { initGame, handleMove };
