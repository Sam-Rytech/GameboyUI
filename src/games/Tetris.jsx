import React, { useState, useEffect, useRef } from 'react'
import useGameLoop from '../hooks/useGameLoop'

const COLS = 10
const ROWS = 20
const BLOCK_SIZE = 20

const TETROMINOS = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
}

const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS)
  return TETROMINOS[keys[Math.floor(Math.random() * keys.length)]]
}

const Tetris = () => {
  const canvasRef = useRef(null)
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  )
  const [current, setCurrent] = useState({
    shape: randomTetromino(),
    x: 3,
    y: 0,
  })
  const [score, setScore] = useState(0)

  const merge = (newBoard, shape, x, y) => {
    shape.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val) newBoard[y + i][x + j] = val
      })
    )
    return newBoard
  }

  const collide = (shape, x, y) => {
    return shape.some((row, i) =>
      row.some((val, j) => val && (board[y + i] && board[y + i][x + j]) !== 0)
    )
  }

  const rotate = (shape) =>
    shape[0].map((_, i) => shape.map((row) => row[i])).reverse()

  const drop = () => {
    const { shape, x, y } = current
    if (!collide(shape, x, y + 1)) {
      setCurrent({ ...current, y: y + 1 })
    } else {
      let newBoard = merge([...board.map((r) => [...r])], shape, x, y)
      newBoard = clearLines(newBoard)
      setBoard(newBoard)
      setCurrent({ shape: randomTetromino(), x: 3, y: 0 })
    }
  }

  const clearLines = (brd) => {
    let newBoard = brd.filter((row) => row.some((val) => val === 0))
    const cleared = ROWS - newBoard.length
    if (cleared > 0) {
      setScore((s) => s + cleared * 10)
      while (newBoard.length < ROWS) newBoard.unshift(Array(COLS).fill(0))
    }
    return newBoard
  }

  useGameLoop(() => {
    drop()
    draw()
  }, 500)

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE)

    board.forEach((row, y) =>
      row.forEach((val, x) => {
        if (val) {
          ctx.fillStyle = 'cyan'
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
        }
      })
    )

    current.shape.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val) {
          ctx.fillStyle = 'orange'
          ctx.fillRect(
            (current.x + j) * BLOCK_SIZE,
            (current.y + i) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          )
        }
      })
    )
  }

  useEffect(() => {
    draw()
  }, [])

  const handleKey = (e) => {
    if (
      e.key === 'ArrowLeft' &&
      !collide(current.shape, current.x - 1, current.y)
    )
      setCurrent({ ...current, x: current.x - 1 })
    if (
      e.key === 'ArrowRight' &&
      !collide(current.shape, current.x + 1, current.y)
    )
      setCurrent({ ...current, x: current.x + 1 })
    if (e.key === 'ArrowDown') drop()
    if (e.key === 'ArrowUp')
      setCurrent({ ...current, shape: rotate(current.shape) })
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white">Tetris - Score: {score}</h2>
      <canvas
        ref={canvasRef}
        width={COLS * BLOCK_SIZE}
        height={ROWS * BLOCK_SIZE}
        style={{ background: 'black' }}
      />
    </div>
  )
}

export default Tetris
