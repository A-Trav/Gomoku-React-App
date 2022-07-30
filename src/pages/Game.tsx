import { useState, useReducer, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLocalStorage, gameReducer } from '../utils/hooks'
import { Button } from '../components/app'
import { GameDetails, Board } from '../components/game'
import { GameInitState, GameResult } from '../utils/types'
import { GAME_ACTIONS } from '../utils/constants'
import { checkForWin, checkForDraw, getCurrentPlayer } from '../utils/game'

import style from './css/Game.module.css'

export default function Game() {
    const { id, boardWidth } = useLocation().state as GameInitState
    const [games, saveGame] = useLocalStorage<Record<string, GameResult>>(
        'Games', {})
    const currentGameTitle = `Game #${id}`
    const [state, dispatch] = useReducer(gameReducer, [])
    const [gameWon, setGameWon] = useState(false)
    const [gameDraw, setGameDraw] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.count('Use Effect count')
        checkGameWon(state)
        checkGameDraw(state)
    })

    function checkGameWon(state: number[]) {
        if (checkForWin(state.filter((_, index) => getCurrentPlayer(index) === getCurrentPlayer(state.length)), boardWidth))
            setGameWon(true)
    }

    function checkGameDraw(state: number[]) {
        if (checkForDraw(state.length, boardWidth))
            setGameDraw(true)
    }

    return (
        <div className={style.container}>
            <GameDetails
                currentPlayer={getCurrentPlayer(state.length, (gameWon || gameDraw))}
                gameWon={gameWon}
                gameDraw={gameDraw}
            />
            <Board
                boardWidth={boardWidth}
                currentPlayer={getCurrentPlayer(state.length, (gameWon || gameDraw))}
                gameComplete={(gameWon || gameDraw)}
                dispatch={dispatch}
            />
            <div className={style.controller}>
                <Button className={style.button} onClick={() => { dispatch({ type: GAME_ACTIONS.RESTART }) }}>Restart</Button>
                <Button className={style.button} onClick={() => {
                    if (gameDraw || gameWon)
                        saveGame({
                            ...games, [currentGameTitle]: {
                                winner: getCurrentPlayer(state.length, gameWon || gameDraw),
                                date: new Date().toLocaleDateString(),
                                result: state,
                                boardWidth: boardWidth,
                                gameWon: gameWon,
                                gameDraw: gameDraw
                            }
                        })
                    navigate('/games')
                }}>Leave</Button>
            </div>
        </div >
    )
}
