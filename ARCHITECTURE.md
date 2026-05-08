# 2048 Game Architecture

## Overview
A standard 2048 game implementation on a 4x4 grid. Players combine tiles by pressing arrow keys to slide them in one direction. Tiles with the same number merge into one, doubling the value. After each move, a new tile appears in a random empty cell. The game ends when no moves are possible.

## Modules

### 1. Game State (`game.js`)
**Responsibility:** Manage the core game state including the grid, score, highest tile, and game status.

**Interfaces:**
- `getGrid()` - Returns the current 4x4 grid
- `setGrid(newGrid)` - Updates the grid
- `getScore()` - Returns current score
- `setScore(score)` - Updates score
- `getHighestTile()` - Returns highest tile value
- `isGameOver()` - Checks if game is over
- `resetGame()` - Resets game to initial state

### 2. Tile Management (`tile.js`)
**Responsibility:** Handle tile creation, movement, and merging logic.

**Interfaces:**
- `createRandomTile(grid)` - Creates a new tile (2 or 4) in a random empty cell
- `canMove(grid, direction)` - Checks if a move in the given direction is possible
- `mergeTiles(grid, direction)` - Performs tile merging and returns score gained
- `moveTiles(grid, direction)` - Slides tiles in the given direction

### 3. Input Handler (`input.js`)
**Responsibility:** Handle keyboard input and map arrow keys to game actions.

**Interfaces:**
- `initInput(handler)` - Initialize keyboard listeners
- `handleArrowKey(direction)` - Processes arrow key presses
- `destroyInput()` - Removes keyboard listeners

### 4. UI Manager (`ui.js`)
**Responsibility:** Render the game board, score, and game status to the DOM.

**Interfaces:**
- `initUI(gameState)` - Initialize the UI with current game state
- `renderGrid(grid)` - Renders the grid to the DOM
- `renderScore(score)` - Updates the score display
- `renderHighestTile(tile)` - Updates the highest tile display
- `showGameOver()` - Shows game over message
- `showGameWon()` - Shows win message (when 2048 tile is reached)

### 5. Main Controller (`main.js`)
**Responsibility:** Coordinate between modules, initialize the game, and handle game loop.

**Interfaces:**
- `initGame()` - Initialize and start the game
- `handleMove(direction)` - Process a move in the given direction
- `checkWinCondition()` - Check if player has reached 2048

## File Structure
```
index.html          - Main HTML file with game board structure
styles.css          - CSS styling for the game
game.js             - Game state management
tile.js             - Tile movement and merging logic
input.js            - Keyboard input handling
ui.js               - UI rendering
main.js             - Main controller and game initialization
```

## Game Rules
1. Grid is 4x4 with 16 cells
2. Each move slides all tiles in the chosen direction
3. Tiles of the same value merge into one (value doubles)
4. After each move, a new tile (2 or 4) appears in a random empty cell
5. Game ends when no moves are possible
6. Score increases by the value of merged tiles
7. Track highest tile reached
8. Win when tile 2048 is reached (optional win condition)
