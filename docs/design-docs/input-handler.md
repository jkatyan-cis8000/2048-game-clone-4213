# Input Handler Design Document

## Overview
The `input.js` module handles keyboard input and maps arrow keys to game actions (directions 0-3).

## Architecture
- Uses module pattern with IIFE for encapsulation
- Registers globalkeydown event listener
- Delegates to registered handler function

## Implementation Details

### initInput(handler)
- Accepts a handler function that receives direction parameter
- Attacheskeydown event listener to document
- Handler must be a function to receive direction codes

### handleKeyDown(event)
- Intercepts keydown events
- Maps arrow keys to direction codes:
  - ArrowUp → 0
  - ArrowRight → 1
  - ArrowDown → 2
  - ArrowLeft → 3
- Calls `event.preventDefault()` to prevent page scrolling
- Delegates to `handleArrowKey()`

### handleArrowKey(direction)
- Validates handler exists
- Calls registered handler with direction code (0-3)

### destroyInput()
- Removeskeydown event listener
- Clears handler reference to prevent memory leaks

## Constraints
- Input handler is global; only one handler can be registered at a time
- Handler must be set before calling initInput() or via the initInput parameter
