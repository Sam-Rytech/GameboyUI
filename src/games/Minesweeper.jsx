// src/games/Minesweeper.jsx
import React, { useState, useEffect } from 'react'



export default function Minesweeper() {
  const size = 8
  const mines = 10
  const [board, setBoard] = useState(generateBoard(size, mines))
  const [gameOver, setGameOver] = useState(false)

  const revealCell = (r, c) => {
    if (board[r][c].revealed || gameOver) return
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
    newBoard[r][c].revealed = true
    if (newBoard[r][c].mine) {
      setGameOver(true)
    } else if (newBoard[r][c].adjacent === 0) {
      // auto-reveal neighbors
      const dirs = [-1, 0, 1]
      dirs.forEach((dr) =>
        dirs.forEach((dc) => {
          if (dr || dc) {
            const nr = r + dr
            const nc = c + dc
            if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
              revealCell(nr, nc)
            }
          }
        })
      )
    }
    setBoard(newBoard)
  }

  return (
    <div>
      <h3>Minesweeper</h3>
      {gameOver && <p>💥 Game Over!</p>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 30px)`,
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => revealCell(r, c)}
              style={{
                width: '30px',
                height: '30px',
                fontSize: '12px',
                background: cell.revealed ? '#ddd' : '#666',
                color: cell.mine ? 'red' : 'black',
              }}
            >
              {cell.revealed ? (cell.mine ? '💣' : cell.adjacent || '') : ''}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
