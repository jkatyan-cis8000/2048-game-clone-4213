# UI Manager Design Document

## Overview
The `ui.js` module renders the game board, score, best score, and game messages to the DOM.

## Architecture
- Uses module pattern with IIFE for encapsulation
- Maintains references to DOM elements
- Tracks tile elements for rendering

## Implementation Details

### initUI(gameState)
- Gets references to DOM elements:
  - grid-container: Container for grid cells
  - score: Score display element
  - best-score: Best score display element
  - game-message: Message overlay container
  - message-text: Text content of message
  - restart-btn: Restart button
- Creates grid cells (16 cells for 4x4 grid)
- Attaches restart button click handler

### createGridCells()
- Creates 16 grid cell divs
- Assigns data-row and data-col attributes for position tracking
- Stores references in tiles array

### renderGrid(grid)
- Clears all existing tile elements
- Iterates through grid (4x4)
- Creates tile div for non-zero values
- Positions tiles using absolute positioning relative to grid container

### createTileElement(row, col, value)
- Gets the grid cell for given position
- Creates tile div with value as text content
- Applies CSS class based on value (tile-2, tile-4, etc.)
- Calculates absolute position using getBoundingClientRect()
- Appends to grid-container

### getTileClass(value)
- Returns CSS class based on tile value
- Handles values up to 2048 with specific classes
- Uses tile-super class for values > 2048

### renderScore(score)
- Updates score element text content

### renderHighestTile(tile)
- Updates best-score element text content

### showGameOver()
- Sets message text to "Game Over!"
- Adds active class to message element

### showGameWon()
- Sets message text to "You Win!"
- Adds active class to message element

### hideMessage()
- Removes active class from message element

### setRestartHandler(handler)
- Registers restart callback function

## Constraints
- Uses fixed positioning (100px tiles with 15px gaps)
- Requires specific CSS structure for absolute positioning
- Message element must have active class support in CSS
