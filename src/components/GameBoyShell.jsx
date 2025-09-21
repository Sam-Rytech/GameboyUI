import React from 'react'
import Screen from './Screen'
import Controls from './Controls'
import CartridgeMenu from './CartridgeMenu'
import { useGame } from '../context/GameContext'
import SoundToggle from './SoundToggle'

/**
 * Top-level console wrapper. Uses GameContext.
 */
export default function GameBoyShell() {
  const { game } = useGame()

  return (
    <div className="gb-outer" role="application" aria-label="GameBoy UI">
      <div className="gb-top">
        <div className="brand">RetroBoy</div>
        <SoundToggle />
      </div>

      <div className="gb-screen">
        <div className="screen-canvas">
          <Screen />
        </div>
      </div>

      <div className="controls-row">
        <div className="controls-left">
          <Controls />
        </div>

        <div className="ab-group" style={{ alignItems: 'flex-end' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 12, color: '#333' }}>A / B</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="ab-btn"
                id="btn-a"
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'x' })
                  )
                }
              >
                A
              </button>
              <button
                className="ab-btn"
                id="btn-b"
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'z' })
                  )
                }
              >
                B
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-row">
        <CartridgeMenu />
        <div className="small">Current: {game.toUpperCase()}</div>
      </div>
    </div>
  )
}
