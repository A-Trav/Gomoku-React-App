import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, DropDown } from "../components/app";
import { UserContext } from '../utils/context';
import { useLocalStorage } from '../utils/hooks';
import { GameResult } from '../utils/types';
import style from './css/Home.module.css'

export default function Home() {
    const { user } = useContext(UserContext)
    const [boardSizeSelection, setBoardSizeSelection] = useState<number | undefined>()
    const navigate = useNavigate()
    const [games, saveGame] = useLocalStorage<Record<string, GameResult>>('Games', {})
    const gameNumber = Object.keys(games).length

    function onClickHandler() {
        if (user && boardSizeSelection) {
            navigate('/game', { state: { id: gameNumber, boardWidth: boardSizeSelection } })
        } else if (!user) {
            navigate('/login')
        }
    }

    return (
        <div className={style.container}>
            <DropDown
                setSelectedOption={setBoardSizeSelection}
                defaultText={'Select Board Size'}
                from={5}
                to={20}
            />
            <Button onClick={() => onClickHandler()}>Start Game</Button>
        </div >
    )
}
