import React, { useEffect } from 'react'

/**
 * Simple Flappy Bird demo:
 * Click or Space/Enter to flap.
 */
export default function FlappyBird({ soundOn }) {
  useEffect(() => {
    const cvs = document.getElementById('flappy-cvs')
    const ctx = cvs.getContext('2d')
    cvs.width = 320
    cvs.height = 208

    let y = 100
    let vy = 0
    const gravity = 0.6
    const flapPower = -8
    const pipes = []
    let frame = 0
    let running = true

    function newPipe() {
      const gap = 50 + Math.random() * 50
      const top = 20 + Math.random() * 80
      pipes.push({ x: cvs.width, top, gap })
    }

    function draw() {
      if (!running) return
      ctx.fillStyle = '#08302a'
      ctx.fillRect(0, 0, cvs.width, cvs.height)

      vy += gravity
      y += vy
      if (y > cvs.height) {
        y = 100
        vy = 0
        pipes.length = 0
      }

      if (frame % 90 === 0) newPipe()
      for (let i = 0; i < pipes.length; i++) pipes[i].x -= 2.6
      while (pipes.length && pipes[0].x < -60) pipes.shift()

      ctx.fillStyle = '#2ecc71'
      pipes.forEach((p) => {
        ctx.fillRect(p.x, 0, 40, p.top)
        ctx.fillRect(p.x, p.top + p.gap, 40, cvs.height)
      })

      ctx.fillStyle = '#f1c40f'
      ctx.beginPath()
      ctx.arc(60, y, 10, 0, Math.PI * 2)
      ctx.fill()

      frame++
      requestAnimationFrame(draw)
    }

    function flap() {
      vy = flapPower
      if (soundOn) {
        try {
          const ctxa = new (window.AudioContext || window.webkitAudioContext)()
          const o = ctxa.createOscillator()
          const g = ctxa.createGain()
          o.type = 'sine'
          o.connect(g)
          g.connect(ctxa.destination)
          o.start(0)
          g.gain.value = 0.04
          g.gain.exponentialRampToValueAtTime(0.00001, ctxa.currentTime + 0.08)
          o.stop(ctxa.currentTime + 0.09)
        } catch (e) {}
      }
    }

    function key(evt) {
      if (evt.key === ' ' || evt.key === 'Enter') flap()
    }
    cvs.addEventListener('click', flap)
    window.addEventListener('keydown', key)

    draw()
    return () => {
      cvs.removeEventListener('click', flap)
      window.removeEventListener('keydown', key)
    }
  }, [soundOn])

  return (
    <div style={{ width: 320, height: 208 }}>
      <canvas id="flappy-cvs" style={{ width: '100%', height: '100%' }} />
      <div style={{ fontSize: 12, color: '#111', marginTop: 6 }}>
        Click or press Space/Enter to flap.
      </div>
    </div>
  )
}
