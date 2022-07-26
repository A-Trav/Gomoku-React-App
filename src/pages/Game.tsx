import { useState, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Tile } from '../components'
import { GameTurnPayload } from '../types'
import { PLAYERS } from '../constants'
import { checkForWin, checkForDraw } from '../utils'
import style from './Game.module.css'

type GameState = {
    isWon: Boolean
    isDraw: Boolean
    player: PLAYERS
    tileId: number
}

type GameTurnAction = {
    type: PLAYERS
    payload: GameTurnPayload
}

function gameTurnReducer(state: GameState[], action: GameTurnAction) {
    const { type, payload } = action
    switch (type) {
        case PLAYERS.PLAYER1: {
            return [...state, {
                isWon: checkForWin([...state.filter((turn) => (turn && turn.player === type)).map((turn) => turn.tileId), payload.id], payload.boardSize),
                isDraw: checkForDraw(state.length + 1, payload.boardSize),
                player: type,
                tileId: payload.id
            }]
        }
        case PLAYERS.PLAYER2: {
            return [...state, {
                isWon: checkForWin([...state.filter((turn) => (turn && turn.player === type)).map((turn) => turn.tileId), payload.id], payload.boardSize),
                isDraw: checkForDraw(state.length + 1, payload.boardSize),
                player: type,
                tileId: payload.id
            }]
        }
        default:
            return state
    }
}

export default function Game() {
    const [state, dispatch] = useReducer(gameTurnReducer, [])
    const [gameComplete, setGameComplete] = useState(false)
    const boardSize = useLocation().state as number
    var gameBoard = getNewGameBoard()

    function getCurrentPlayer() {
        if (state[state.length - 1]) {
            const { player } = state[state.length - 1]
            if (player === PLAYERS.PLAYER1)
                return PLAYERS.PLAYER2
        }
        return PLAYERS.PLAYER1
    }

    function gameOver(state: GameState[]) {
        if (state.filter((turn) => turn.isDraw === true || turn.isWon === true).length > 0) {
            setGameComplete(true)
            return true
        }
        return false
    }

    function getNewRoundDisplay() {
        if (gameComplete || gameOver(state))
            return `Player: ${getCurrentPlayer()} has Won!`
        if (!gameComplete)
            return `Current Player: ${getCurrentPlayer()}`
    }

    function getNewGameBoard() {
        return (
            [...Array(boardSize * boardSize)].map((_, index) => (
                <Tile key={`tile-${index}`} id={index} nextStatusChange={getCurrentPlayer()} gameComplete={gameComplete} onSelect={
                    () => {
                        if (!gameComplete) {
                            dispatch({
                                type: getCurrentPlayer(),
                                payload: {
                                    id: index,
                                    boardSize: boardSize
                                }
                            })
                        }
                    }
                } />
            ))
        )
    }

    return (
        <div className={style.container}>
            <h1 className={style.header}>
                {getNewRoundDisplay()}
            </h1>
            <div className={style.board}>
                <div className={style.tile}
                    style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }
                    }>{gameBoard}</div>
            </div>
            <div className={style.controller}>
                <Button className={style.button} onClick={() => { console.log(gameBoard) }}>Restart</Button>
                <Button className={style.button}>Leave</Button>
            </div>
        </div>
    )
}
