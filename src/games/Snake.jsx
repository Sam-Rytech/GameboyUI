import React, { useRef, useEffect, useState } from 'react'

/* Snake constants */
const CELL = 12
const COLS = 26
const ROWS = 16
const WIDTH = CELL * COLS
const HEIGHT = CELL * ROWS

/* small beep */
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'square'
    o.connect(g)
    g.connect(ctx.destination)
    o.start(0)
    g.gain.setValueAtTime(0.05, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.08)
    o.stop(ctx.currentTime + 0.09)
  } catch (e) {}
}

export default function Snake({ soundOn = true }) {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const dirRef = useRef({ x: 1, y: 0 })
  const snakeRef = useRef([{ x: 4, y: 8 }])
  const foodRef = useRef({ x: 10, y: 6 })
  const speedRef = useRef(8)
  const lastTickRef = useRef(0)
  const frameRef = useRef(null)
  const pausedRef = useRef(false)

  const placeFood = () => {
    let x,
      y,
      tries = 0
    do {
      x = Math.floor(Math.random() * COLS)
      y = Math.floor(Math.random() * ROWS)
      tries++
      if (tries > 200) break
    } while (snakeRef.current.find((s) => s.x === x && s.y === y))
    foodRef.current = { x, y }
  }

  const resetGame = () => {
    snakeRef.current = [{ x: 6, y: 8 }]
    dirRef.current = { x: 1, y: 0 }
    placeFood()
    speedRef.current = 8
    setScore(0)
    pausedRef.current = false
  }

  useEffect(() => {
    function handler(e) {
      const key = e.key
      if (key === 'ArrowUp' && dirRef.current.y !== 1)
        dirRef.current = { x: 0, y: -1 }
      if (key === 'ArrowDown' && dirRef.current.y !== -1)
        dirRef.current = { x: 0, y: 1 }
      if (key === 'ArrowLeft' && dirRef.current.x !== 1)
        dirRef.current = { x: -1, y: 0 }
      if (key === 'ArrowRight' && dirRef.current.x !== -1)
        dirRef.current = { x: 1, y: 0 }
      if (key === 'Enter') {
        pausedRef.current = !pausedRef.current
      }
      if (key === ' ') {
        resetGame()
      }
      // A/B emulation (x / z)
      if (key === 'x') {
        // A press - grow a bit
        snakeRef.current.push({
          ...snakeRef.current[snakeRef.current.length - 1],
        })
        if (soundOn) beep()
      }
      if (key === 'z') {
        // B press - speed up momentarily
        speedRef.current = Math.min(20, speedRef.current + 2)
        if (soundOn) beep()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [soundOn])

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    canvasRef.current.width = WIDTH
    canvasRef.current.height = HEIGHT

    function tick(now) {
      frameRef.current = requestAnimationFrame(tick)
      if (!lastTickRef.current) lastTickRef.current = now
      const delta = now - lastTickRef.current
      const interval = 1000 / speedRef.current
      if (pausedRef.current) {
        lastTickRef.current = now
        return
      }
      if (delta < interval) return
      lastTickRef.current = now

      // move snake
      const snake = snakeRef.current.slice()
      const head = { ...snake[snake.length - 1] }
      head.x += dirRef.current.x
      head.y += dirRef.current.y

      // wrap
      if (head.x < 0) head.x = COLS - 1
      if (head.x >= COLS) head.x = 0
      if (head.y < 0) head.y = ROWS - 1
      if (head.y >= ROWS) head.y = 0

      // self-collision
      if (snake.find((s) => s.x === head.x && s.y === head.y)) {
        if (soundOn) beep()
        resetGame()
        return
      }

      snake.push(head)

      // eat
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((s) => s + 1)
        if (soundOn) beep()
        speedRef.current = Math.min(18, speedRef.current + 0.25)
        placeFood()
      } else {
        snake.shift()
      }

      snakeRef.current = snake

      // draw
      ctx.fillStyle = '#0b3a2f'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      // food
      ctx.fillStyle = '#ffdf5c'
      ctx.fillRect(
        foodRef.current.x * CELL + 2,
        foodRef.current.y * CELL + 2,
        CELL - 4,
        CELL - 4
      )

      // snake
      for (let i = 0; i < snakeRef.current.length; i++) {
        const s = snakeRef.current[i]
        ctx.fillStyle =
          i === snakeRef.current.length - 1 ? '#4caf50' : '#1b8d4a'
        ctx.fillRect(s.x * CELL + 2, s.y * CELL + 2, CELL - 4, CELL - 4)
      }

      // HUD
      ctx.fillStyle = 'rgba(0,0,0,0.6)'
      ctx.fillRect(0, HEIGHT - 20, WIDTH, 20)
      ctx.fillStyle = '#fff'
      ctx.font = '12px Arial'
      ctx.fillText('SCORE: ' + score, 6, HEIGHT - 6)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [soundOn, score])

  return (
    <div style={{ width: WIDTH, height: HEIGHT }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: '#dbe7cf',
        }}
      />
      <div
        style={{
          width: WIDTH,
          marginTop: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 12, color: '#111' }}>Score: {score}</div>
        <div style={{ fontSize: 12, color: '#111' }}>
          {pausedRef.current ? 'Paused' : 'Playing'} • Enter Pause • Space Reset
        </div>
      </div>
    </div>
  )
}
