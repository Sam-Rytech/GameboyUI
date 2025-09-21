import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [game, setGame] = useState('snake')
  const [soundOn, setSoundOn] = useState(true)

  const value = {
    game,
    setGame,
    soundOn,
    setSoundOn,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
