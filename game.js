/**
 * Game State Management Module
 * Manages the core game state including the grid, score, highest tile, and game status.
 */

import { createRandomTile, canMove, moveTiles } from './tile.js';

const GRID_SIZE = 4;

let grid = [];
let score = 0;
let highestTile = 0;
let gameOver = false;
let gameWon = false;

/**
 * Initializes the game state with a 4x4 grid.
 */
function initGameState() {
  grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  score = 0;
  highestTile = 0;
  gameOver = false;
  gameWon = false;
}

/**
 * Returns the current 4x4 grid.
 * @returns {number[][]} - The current grid
 */
function getGrid() {
  return grid;
}

/**
 * Updates the grid.
 * @param {number[][]} newGrid - The new grid to set
 */
function setGrid(newGrid) {
  grid = newGrid;
}

/**
 * Returns the current score.
 * @returns {number} - The current score
 */
function getScore() {
  return score;
}

/**
 * Updates the score.
 * @param {number} scoreValue - The new score
 */
function setScore(scoreValue) {
  score = scoreValue;
}

/**
 * Returns the highest tile value reached.
 * @returns {number} - The highest tile value
 */
function getHighestTile() {
  return highestTile;
}

/**
 * Updates the highest tile value.
 * @param {number} value - The new highest tile value
 */
function updateHighestTile(value) {
  if (value > highestTile) {
    highestTile = value;
  }
}

/**
 * Checks if the game is over (no moves possible).
 * @returns {boolean} - True if game is over, false otherwise
 */
function isGameOver() {
  return gameOver;
}

/**
 * Sets the game over state.
 * @param {boolean} state - True if game is over
 */
function setGameOver(state) {
  gameOver = state;
}

/**
 * Checks if the game has been won (2048 tile reached).
 * @returns {boolean} - True if game is won, false otherwise
 */
function isGameWon() {
  return gameWon;
}

/**
 * Sets the game won state.
 * @param {boolean} state - True if game is won
 */
function setGameWon(state) {
  gameWon = state;
}

/**
 * Resets the game to initial state.
 */
function resetGame() {
  initGameState();
}

/**
 * Adds a new random tile to the grid.
 */
function addRandomTile() {
  const newTile = createRandomTile(grid);
  if (newTile) {
    grid[newTile.row][newTile.col] = newTile.value;
    updateHighestTile(newTile.value);
  }
}

export { 
  getGrid, 
  setGrid, 
  getScore, 
  setScore, 
  getHighestTile, 
  updateHighestTile, 
  isGameOver, 
  setGameOver, 
  isGameWon, 
  setGameWon, 
  resetGame, 
  addRandomTile 
};
