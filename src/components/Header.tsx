import { Link, useNavigate } from 'react-router-dom'
import style from './Header.module.css'

export default function Header() {
    const navigate = useNavigate()

    return (
        <header className={style.header}>
            <div className={style.container}>
                <Link to="/">Gomoku</Link>
                <div className={style.actions}>
                    <button className={style.action} onClick={() => navigate('Login')}>Login</button>
                    <button className={style.action} onClick={() => navigate('Games')}>Previous Games</button>
                </div>
            </div>
        </header >
    )
}
