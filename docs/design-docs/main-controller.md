# Main Controller Design Document

## Overview
The `main.js` module is the central coordinator that ties together game state, input handling, and UI rendering.

## Architecture
- Uses module pattern with IIFE for encapsulation
- Imports/uses all other modules (GameState, TileManager, InputHandler, UIManager)
- Handles game loop logic and state transitions

## Implementation Details

### initGame()
1. Resets game state:
   - Clears grid
   - Sets score to 0
   - Sets highestTile to 0
   - Resets gameOver and gameWon flags
2. Initializes UI with GameState
3. Sets up input handler with handleMove callback
4. Adds two initial tiles (2 or 4)
5. Updates UI to initial state
6. Hides any game messages

### handleMove(direction)
Processes a move in the given direction (0-3):

1. Checks if game is over - exits if true
2. Validates move is possible using TileManager.canMove()
3. Performs move using TileManager.moveTiles():
   - Slides tiles in direction
   - Merges adjacent tiles of same value
   - Returns new grid, score gained, and moved flag
4. If move occurred:
   - Updates grid in GameState
   - Updates score in GameState
   - Updates highest tile
   - Adds new random tile (2 or 4)
   - Checks win condition (highest tile >= 2048):
     - Sets gameWon flag
     - Shows win message (game continues)
   - Updates UI (grid, score, best score)
   - Checks if game is over:
     - Sets gameOver flag
     - Shows game over message

### updateUI()
- Calls renderGrid() with current grid
- Calls renderScore() with current score
- Calls renderHighestTile() with current highest tile

### isGameOver()
- Checks all four directions for possible moves
- Returns true if no moves are possible in any direction

### restartGame()
- Calls initGame() to reset and restart

## Game Flow

1. **Initialization**: initGame() sets up the game
2. **Input Loop**: User presses arrow keys
3. **Move Processing**: handleMove() processes each input
4. **State Updates**: New tiles added after valid moves
5. **Win Check**: Win message shown when 2048 reached (game continues)
6. **Game Over Check**: Game over message shown when no moves possible
7. **Restart**: Clicking button calls restartGame()

## Win Condition
- When highest tile reaches 2048:
  - gameWon flag set to true
  - Win message displayed
  - Game continues (allows user to keep playing)
- This matches original 2048 game behavior

## Game Over Detection
- After each move, checks all four directions
- If no valid moves exist in any direction, game ends

## Constraints
- Only one game instance supported
- State transitions are immediate (no animations for move)
- Restart completely resets all game state
