import React, { useEffect } from 'react'

/**
 * Tetris demo placeholder.
 * Replace with a full implementation when ready.
 */
export default function Tetris() {
  useEffect(() => {
    let raf
    const cvs = document.getElementById('tetris-cvs')
    const ctx = cvs.getContext('2d')
    cvs.width = 320
    cvs.height = 208

    let x = 0
    let dir = 1
    function draw() {
      ctx.fillStyle = '#082418'
      ctx.fillRect(0, 0, cvs.width, cvs.height)

      ctx.fillStyle = '#e67e22'
      ctx.fillRect(40 + x, 80, 50, 50)

      ctx.fillStyle = '#fff'
      ctx.font = '14px Arial'
      ctx.fillText('TETRIS (demo)', 10, 20)
      ctx.fillText('This is a placeholder. Replace with full game.', 10, 40)

      x += dir * 2
      if (x > 160 || x < 0) dir *= -1

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ width: 320, height: 208 }}>
      <canvas id="tetris-cvs" style={{ width: '100%', height: '100%' }} />
      <div style={{ fontSize: 12, color: '#111', marginTop: 6 }}>
        Tetris placeholder — integrate real implementation later.
      </div>
    </div>
  )
}
