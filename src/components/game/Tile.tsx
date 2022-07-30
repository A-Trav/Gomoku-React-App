import { useState } from 'react'
import { TILE_STATUS } from '../../utils/constants'

import style from './css/Tile.module.css'

type TileProps = {
    id: number
    historicState?: string;
    nextStatusChange: string
    onSelect: () => void
    gameComplete: Boolean
}

export default function Tile(props: TileProps) {
    const { id, onSelect, nextStatusChange, gameComplete, historicState } = props
    const [status, setStatus] = useState(historicState ? historicState : TILE_STATUS.AVAILABLE)

    const getClassName = () => {
        const className = style.tile
        switch (status) {
            case TILE_STATUS.AVAILABLE:
                return `${className} ${style.available}`
            case TILE_STATUS.PLAYER1:
                return `${className} ${style.player1}`
            case TILE_STATUS.PLAYER2:
                return `${className} ${style.player2}`
            default:
                return className
        }
    }

    const handleClick = () => {
        if (status === TILE_STATUS.AVAILABLE && !gameComplete) {
            console.log('selected tile', id)
            setStatus(nextStatusChange as TILE_STATUS)
            onSelect()
        }
    }

    return <div className={getClassName()} onClick={handleClick} />
}
