// src/games/Breakout.jsx
import React, { useRef, useEffect } from 'react'

export default function Breakout() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let ballRadius = 10
    let x = canvas.width / 2
    let y = canvas.height - 30
    let dx = 2
    let dy = -2
    let paddleHeight = 10
    let paddleWidth = 75
    let paddleX = (canvas.width - paddleWidth) / 2
    let rightPressed = false
    let leftPressed = false
    let brickRowCount = 3
    let brickColumnCount = 5
    let brickWidth = 75
    let brickHeight = 20
    let brickPadding = 10
    let brickOffsetTop = 30
    let brickOffsetLeft = 30
    let bricks = []
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true
    })
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false
    })










    draw()
  }, [])

  return (
    <div>
      <h3>Breakout</h3>
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        style={{ border: '1px solid #000' }}
      />
    </div>
  )
}
