/**
 * Input handler module for 2048 game
 * Handles keyboard input and maps arrow keys to game actions
 */

import { DIRECTIONS } from './tile.js';

// Direction mapping for arrow keys
const ARROW_KEYS = {
    'ArrowUp': DIRECTIONS.UP,
    'ArrowRight': DIRECTIONS.RIGHT,
    'ArrowDown': DIRECTIONS.DOWN,
    'ArrowLeft': DIRECTIONS.LEFT
};

// Current handler function
let currentHandler = null;

/**
 * Initialize keyboard listeners
 * @param {Function} handler - Function to call when arrow key is pressed
 *                            Receives direction (0=up, 1=right, 2=down, 3=left)
 */
function initInput(handler) {
    currentHandler = handler;
    
    document.addEventListener('keydown', handleKeyDown);
}

/**
 * Handle keydown events
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyDown(event) {
    const direction = ARROW_KEYS[event.key];
    
    if (direction !== undefined) {
        event.preventDefault(); // Prevent scrolling
        if (currentHandler) {
            currentHandler(direction);
        }
    }
}

/**
 * Handle arrow key directly (for testing or other input methods)
 * @param {number} direction - Direction (0=up, 1=right, 2=down, 3=left)
 */
function handleArrowKey(direction) {
    if (currentHandler) {
        currentHandler(direction);
    }
}

/**
 * Destroy input listeners (cleanup)
 */
function destroyInput() {
    document.removeEventListener('keydown', handleKeyDown);
    currentHandler = null;
}

export {
    initInput,
    handleArrowKey,
    destroyInput,
    DIRECTIONS
};
