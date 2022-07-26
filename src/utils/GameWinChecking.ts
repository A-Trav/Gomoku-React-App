function checkHorizontalWin(state: number[], boardWidth: number) {
    let counter = 0;
    let tile;
    for (let i = 0; i < state.length; i++) {
        counter = 0;
        tile = state[i]
        for (let j = i + 1; j < state.length; j++) {
            if (tile + 1 === state[j]) {
                tile = state[j];
                counter++;
            } else
                break;
        }
        if (counter === 4)
            return true;
    }
    return false;
}

function checkVerticalWin(state: number[], boardWidth: number) {
    let tile;
    let counter = 0;
    for (let i = 0; i < state.length; i++) { // check each tile for a vertical line
        counter = 0;
        tile = state[i];
        for (let j = 0; boardWidth; j++) { // other tiles
            if (state.includes(tile + boardWidth)) {
                tile = tile + boardWidth;
                counter++;
            } else
                break;
        }
        // check that the chain isn't longer than 5
        if (counter === 4)
            return true;
    }
    return false;
}

function checkDiagonalWin(state: number[], angle: number, boardWidth: number) {
    let tile;
    let counter = 0;
    for (let i = 0; i < state.length; i++) { // check each tile for a vertical line
        counter = 0;
        tile = state[i];
        for (let j = 0; boardWidth; j++) { // other tiles
            if (state.includes(tile + boardWidth + angle)) {
                tile = tile + boardWidth + angle;
                counter++;
            } else
                break;
        }
        // check that the chain isn't longer than 5
        if (counter === 4)
            return true;
    }
    return false;
}

export const checkForWin = (state: number[], boardWidth: number) => {
    if (state.length >= 5) {
        // check horizontal:
        if (checkHorizontalWin(state, boardWidth) ||
            // check vertical
            checkVerticalWin(state, boardWidth) ||
            // check forward diagonals
            checkDiagonalWin(state, 1, boardWidth) ||
            // check backward diagonals
            checkDiagonalWin(state, -1, boardWidth)) {
            console.log('game has been won')
            return true
        }
    }
    return false
}

export const checkForDraw = (numberOfTurns: number, boardWidth: number) => {
    if (numberOfTurns === Math.pow(boardWidth, boardWidth))
        return true
    return false
}