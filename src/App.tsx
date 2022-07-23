import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, UserProvider } from './components';
import { Game, GameLog, Games, Home, Login } from './pages';

import style from './App.module.css';

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  )
}

export default App;
