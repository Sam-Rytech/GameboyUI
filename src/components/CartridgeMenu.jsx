import React from 'react'
import { useGame } from '../context/GameContext'

/**
 * Simple select to change active game.
 */
export default function CartridgeMenu() {
  const { game, setGame } = useGame()

  return (
    <div className="cartridge" aria-hidden="false">
      <label style={{ fontSize: 13, color: '#333' }}>Cartridge</label>
      <select
        className="select"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        <option value="snake">Snake</option>
        <option value="tetris">Tetris</option>
        <option value="flappy">Flappy</option>
      </select>
    </div>
  )
}
