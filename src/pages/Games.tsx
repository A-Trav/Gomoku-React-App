import { useContext } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { UserContext } from "../context"
import { useLocalStorage } from "../hooks"
import { GameResult } from "../types"

import style from './Games.module.css'

export default function Games() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [games] = useLocalStorage<Record<string, GameResult>>(`Games`, {})
    if (!user) return <Navigate to="/login" />
    return (
        <div className={style.container}>
            {Object.keys(games).map((id) => {
                const { [id]: game } = games
                const gameDescription = `${id} @${game.date} Winner: ${game.winner}`
                // console.log(game)
                return (
                    <div className={style.list} key={id} >
                        <p className={style.title}>{gameDescription}</p>
                        <button className={style.button}
                            onClick={() => navigate(`/game-log/${id.split('#')[1]}`)}
                        >
                            View
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
