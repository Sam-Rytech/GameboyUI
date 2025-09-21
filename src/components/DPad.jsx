import React from 'react'

/**
 * DPad: each button dispatches an arrow key event.
 */
const sendKey = (key) =>
  window.dispatchEvent(new KeyboardEvent('keydown', { key }))

export default function DPad() {
  return (
    <div className="dpad" role="group" aria-label="D-Pad">
      <div className="dbtn empty" />
      <div className="dbtn" onClick={() => sendKey('ArrowUp')}>
        ▲
      </div>
      <div className="dbtn empty" />
      <div className="dbtn" onClick={() => sendKey('ArrowLeft')}>
        ◄
      </div>
      <div className="dbtn empty" />
      <div className="dbtn" onClick={() => sendKey('ArrowRight')}>
        ►
      </div>
      <div className="dbtn empty" />
      <div className="dbtn" onClick={() => sendKey('ArrowDown')}>
        ▼
      </div>
      <div className="dbtn empty" />
    </div>
  )
}
