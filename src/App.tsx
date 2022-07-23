import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components';
import { Game, GameLog, Games, Home, Login } from './pages';

import style from './App.module.css';

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/game-log/:id" element={<GameLog />} />
          <Route path="/games" element={<Games />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
