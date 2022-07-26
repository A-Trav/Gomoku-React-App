import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, DropDown } from "../components";
import { UserContext } from '../context';

import style from './Home.module.css'

export default function Home() {
    const { user } = useContext(UserContext)
    const [boardSizeSelection, setBoardSizeSelection] = useState<number | undefined>()
    const navigate = useNavigate()

    function onClickHandler() {
        if (user) {
            navigate('Game', { state: boardSizeSelection })
        } else {
            navigate('Login')
        }
    }

    return (
        <div className={style.container}>
            <DropDown setSelectedOption={setBoardSizeSelection}></DropDown>
            <Button onClick={() => onClickHandler()}>Start Game</Button>
        </div >
    )
}
