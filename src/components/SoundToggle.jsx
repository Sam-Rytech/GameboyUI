import React from 'react'
import { useGame } from '../context/GameContext'

/**
 * Toggle sound on/off
 */
export default function SoundToggle() {
  const { soundOn, setSoundOn } = useGame()

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ fontSize: 12 }}>🔊</div>
      <button
        onClick={() => setSoundOn(!soundOn)}
        className="sbtn"
        aria-pressed={soundOn}
        title={soundOn ? 'Sound on' : 'Sound off'}
      >
        {soundOn ? 'On' : 'Off'}
      </button>
    </div>
  )
}
