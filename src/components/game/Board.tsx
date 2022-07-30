import { Dispatch } from 'react'
import Tile from './Tile'
import { GameAction } from '../../utils/hooks/gameReducer'
import { GAME_ACTIONS, PLAYERS } from '../../utils/constants'
import { getCurrentPlayer } from '../../utils/game'

import style from './css/Board.module.css'

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
                                type: GAME_ACTIONS[currentPlayer],
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
