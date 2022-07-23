import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, DropDown } from "../components";
import { UserContext } from '../context';

import style from './Home.module.css'

export default function Home() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    return (
        <div className={style.container}>
            <DropDown></DropDown>
            <Button onClick={() => user ? navigate('Game') : navigate('Login')}>Start Game</Button>
        </div>
    )
}
