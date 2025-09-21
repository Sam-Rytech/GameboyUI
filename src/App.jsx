import React from 'react'
import { GameProvider } from './context/GameContext'
import GameBoyShell from './components/GameBoyShell'

export default function App() {
  return (
    <GameProvider>
      <div style={{ padding: 24 }}>
        <GameBoyShell />
      </div>
    </GameProvider>
  )
}
