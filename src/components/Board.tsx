import { Dispatch } from 'react'
import { Tile } from '../components'
import { GameAction } from '../hooks/gameReducer'
import { PLAYERS } from '../constants'
import { getCurrentPlayer } from '../utils'

import style from './Board.module.css'

type BoardProps = {
    boardWidth: number
    currentPlayer: PLAYERS
    gameComplete: Boolean
    historicState?: number[]
    dispatch?: Dispatch<GameAction>
}

export default function Board(props: BoardProps) {
    const { boardWidth, currentPlayer, historicState, dispatch, gameComplete } = props

    function getHistoricState(index: number): string | undefined {
        if (historicState && historicState.indexOf(index) >= 0)
            return getCurrentPlayer(historicState.indexOf(index))
    }

    function getNewGameBoard() {
        return (
            [...Array(boardWidth * boardWidth)].map((_, index) => (
                <Tile key={`tile - ${index}`} id={index} nextStatusChange={currentPlayer} gameComplete={gameComplete}
                    historicState={getHistoricState(index)}
                    onSelect={() => {
                        if (dispatch) {
                            dispatch({
                                type: currentPlayer,
                                payload: {
                                    id: index
                                }
                            })
                        }
                    }} />
            ))
        )
    }

    return (
        <div className={style.board}>
            <div className={style.tile}
                style={{ gridTemplateColumns: `repeat(${boardWidth}, 1fr)` }
                }>{getNewGameBoard()}</div>
        </div>
    )
}
