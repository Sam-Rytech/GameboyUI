import React from 'react'
import DPad from './DPad'

/**
 * Controls: DPad + Start/Select
 * Start -> Enter, Select -> Space
 */
export default function Controls() {
  const sendKey = (key) =>
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <DPad />
      <div className="small-ctrls">
        <button className="sbtn" onClick={() => sendKey('Enter')}>
          START
        </button>
        <button className="sbtn" onClick={() => sendKey(' ')}>
          SELECT
        </button>
      </div>
    </div>
  )
}
