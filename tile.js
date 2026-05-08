/**
 * Tile management module for 2048 game
 * Handles tile creation, movement, and merging logic
 */

// Direction constants
const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

/**
 * Creates a new tile (2 or 4) in a random empty cell
 * @param {number[][]} grid - The current 4x4 grid
 * @returns {Object|null} New tile object {value, row, col} or null if no empty cells
 */
function createRandomTile(grid) {
    const emptyCells = [];
    
    // Find all empty cells
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    
    if (emptyCells.length === 0) {
        return null;
    }
    
    // Pick a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    
    // 90% chance of 2, 10% chance of 4
    const value = Math.random() < 0.9 ? 2 : 4;
    
    return { value, row: cell.row, col: cell.col };
}

/**
 * Checks if a move in the given direction is possible
 * @param {number[][]} grid - The current 4x4 grid
 * @param {number} direction - Direction to check (0=up, 1=right, 2=down, 3=left)
 * @returns {boolean} True if move is possible
 */
function canMove(grid, direction) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const current = grid[row][col];
            
            if (current === 0) {
                // Empty cell means we can potentially move
                return true;
            }
            
            // Check each direction for possible merges
            if (direction === DIRECTIONS.UP) {
                if (row > 0 && grid[row - 1][col] === current) return true;
            } else if (direction === DIRECTIONS.RIGHT) {
                if (col < 3 && grid[row][col + 1] === current) return true;
            } else if (direction === DIRECTIONS.DOWN) {
                if (row < 3 && grid[row + 1][col] === current) return true;
            } else if (direction === DIRECTIONS.LEFT) {
                if (col > 0 && grid[row][col - 1] === current) return true;
            }
        }
    }
    return false;
}

/**
 * Shifts tiles in one direction, handling merges
 * @param {number[]} row - A single row or column to shift
 * @returns {Object} Object containing new row and score gained
 */
function shiftRow(row) {
    // Remove zeros
    let nonZero = row.filter(val => val !== 0);
    let score = 0;
    
    // Merge adjacent equal values
    for (let i = 0; i < nonZero.length - 1; i++) {
        if (nonZero[i] === nonZero[i + 1]) {
            nonZero[i] *= 2;
            score += nonZero[i];
            nonZero[i + 1] = 0;
            i++; // Skip next since it was merged
        }
    }
    
    // Remove zeros again after merge and pad with zeros
    nonZero = nonZero.filter(val => val !== 0);
    while (nonZero.length < 4) {
        nonZero.push(0);
    }
    
    return { newRow: nonZero, score };
}

/**
 * Slides tiles in the given direction
 * @param {number[][]} grid - The current 4x4 grid
 * @param {number} direction - Direction to slide (0=up, 1=right, 2=down, 3=left)
 * @returns {Object} Object containing new grid and score gained
 */
function slideTiles(grid, direction) {
    let newGrid = grid.map(row => [...row]);
    let totalScore = 0;
    
    if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
        for (let row = 0; row < 4; row++) {
            let rowTiles = newGrid[row];
            
            // Reverse if moving right
            if (direction === DIRECTIONS.RIGHT) {
                rowTiles.reverse();
            }
            
            const result = shiftRow(rowTiles);
            newGrid[row] = result.newRow;
            totalScore += result.score;
            
            // Reverse back if moving right
            if (direction === DIRECTIONS.RIGHT) {
                newGrid[row].reverse();
            }
        }
    } else if (direction === DIRECTIONS.UP || direction === DIRECTIONS.DOWN) {
        for (let col = 0; col < 4; col++) {
            let colTiles = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
            
            // Reverse if moving down
            if (direction === DIRECTIONS.DOWN) {
                colTiles.reverse();
            }
            
            const result = shiftRow(colTiles);
            colTiles = result.newRow;
            totalScore += result.score;
            
            // Place back
            for (let row = 0; row < 4; row++) {
                newGrid[row][col] = colTiles[row];
            }
            
            // Reverse back if moving down
            if (direction === DIRECTIONS.DOWN) {
                colTiles.reverse();
            }
        }
    }
    
    return { newGrid, score: totalScore };
}

/**
 * Checks if tiles have moved
 * @param {number[][]} oldGrid - Original grid
 * @param {number[][]} newGrid - Grid after move
 * @returns {boolean} True if tiles moved
 */
function hasTilesMoved(oldGrid, newGrid) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (oldGrid[row][col] !== newGrid[row][col]) {
                return true;
            }
        }
    }
    return false;
}
