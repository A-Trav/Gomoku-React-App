import { useNavigate } from 'react-router-dom'
import { Button, DropDown } from "../components";
import style from './Home.module.css'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className={style.container}>
            <DropDown></DropDown>
            <Button onClick={() => navigate('Games')}>Start Game</Button>
        </div>
    )
}
