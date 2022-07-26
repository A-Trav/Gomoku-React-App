import { PLAYERS } from "../constants"

export type GameTurnPayload = {
    // player: PLAYERS
    id: number
    boardSize: number
}