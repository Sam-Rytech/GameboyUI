import React, { useEffect, useRef, useState } from 'react'
import useGameLoop from '../hooks/useGameLoop'

const GRAVITY = 0.5
const JUMP = -8
const PIPE_WIDTH = 50
const PIPE_GAP = 120

const FlappyBird = () => {
  const canvasRef = useRef(null)
  const [bird, setBird] = useState({ x: 50, y: 150, velocity: 0 })
  const [pipes, setPipes] = useState([])
  const [score, setScore] = useState(0)

  const reset = () => {
    setBird({ x: 50, y: 150, velocity: 0 })
    setPipes([])
    setScore(0)
  }

  const jump = () => setBird({ ...bird, velocity: JUMP })

  const update = () => {
    let newBird = {
      ...bird,
      velocity: bird.velocity + GRAVITY,
      y: bird.y + bird.velocity,
    }
    if (newBird.y < 0) newBird.y = 0
    if (newBird.y > 300) return reset()

    let newPipes = pipes.map((pipe) => ({ ...pipe, x: pipe.x - 2 }))

    if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < 200) {
      const topHeight = Math.floor(Math.random() * 150) + 50
      newPipes.push({ x: 400, top: topHeight })
    }

    newPipes = newPipes.filter((p) => p.x + PIPE_WIDTH > 0)

    for (let pipe of newPipes) {
      if (
        bird.x + 20 > pipe.x &&
        bird.x < pipe.x + PIPE_WIDTH &&
        (bird.y < pipe.top || bird.y + 20 > pipe.top + PIPE_GAP)
      ) {
        return reset()
      }
      if (pipe.x === bird.x) setScore((s) => s + 1)
    }

    setBird(newBird)
    setPipes(newPipes)
  }

  useGameLoop(() => {
    update()
    draw()
  }, 30)

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = 'skyblue'
    ctx.fillRect(0, 0, 400, 300)

    ctx.fillStyle = 'yellow'
    ctx.fillRect(bird.x, bird.y, 20, 20)

    ctx.fillStyle = 'green'
    pipes.forEach((p) => {
      ctx.fillRect(p.x, 0, PIPE_WIDTH, p.top)
      ctx.fillRect(p.x, p.top + PIPE_GAP, PIPE_WIDTH, 300 - p.top - PIPE_GAP)
    })

    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 10, 20)
  }

  useEffect(() => {
    draw()
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', (e) => e.code === 'Space' && jump())
    return () => window.removeEventListener('keydown', jump)
  })

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white">Flappy Bird - Score: {score}</h2>
      <canvas ref={canvasRef} width={400} height={300} />
      <button
        onClick={jump}
        className="mt-2 px-4 py-2 bg-yellow-500 text-black rounded"
      >
        Jump
      </button>
    </div>
  )
}

export default FlappyBird
