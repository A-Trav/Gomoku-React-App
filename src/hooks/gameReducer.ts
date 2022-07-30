import { GameTurnPayload } from "../types"
import { PLAYERS } from '../constants'

export type GameAction = {
    type: PLAYERS
    payload?: GameTurnPayload
}

export const gameReducer = (state: number[], action: GameAction) => {
    const { type, payload } = action
    switch (type) {
        case PLAYERS.PLAYER1: {
            if (payload) {
                return [...state, payload.id]
            } else
                return state
        }
        case PLAYERS.PLAYER2: {
            if (payload) {
                return [...state, payload.id]
            } else
                return state
        }
        case PLAYERS.RESTART:
            return []
        default:
            return state
    }
}