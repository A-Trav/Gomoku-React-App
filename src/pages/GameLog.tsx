import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks"
import { GameResult } from "../types"
import { getCurrentPlayer } from "../utils"
import Board from "../components/Board"
import { GameDetails } from "../components"
import { useContext } from "react"
import { UserContext } from "../context"

import style from './GameLog.module.css'

export default function GameLog() {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [games, saveGame] = useLocalStorage<Record<string, GameResult>>(
        'Games', {})
    const { [`Game #${id}`]: game } = games
    const navigate = useNavigate()
    if (!user) return <Navigate to="/login" />
    return (
        <div className={style.container}>
            <GameDetails
                currentPlayer={getCurrentPlayer(game.result.length, game.gameWon || game.gameDraw)}
                gameWon={game.gameWon}
                gameDraw={game.gameDraw}
            />
            <Board
                boardWidth={game.boardWidth}
                currentPlayer={getCurrentPlayer(game.result.length, game.gameWon || game.gameDraw)}
                gameComplete={(game.gameWon || game.gameDraw)}
                historicState={game.result}
            />
            <div className={style.controller}>
                <button className={style.button} onClick={() => navigate('/games')}>Back</button>
            </div>
        </div >
    )
}
