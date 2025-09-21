import React from 'react'
import { useGame } from '../context/GameContext'
import Snake from '../games/Snake'
import Tetris from '../games/Tetris'
import FlappyBird from '../games/FlappyBird'

/**
 * Delegates to the current game's component.
 */
export default function Screen() {
  const { game, soundOn } = useGame()

  return (
    <>
      {game === 'snake' && <Snake soundOn={soundOn} />}
      {game === 'tetris' && <Tetris soundOn={soundOn} />}
      {game === 'flappy' && <FlappyBird soundOn={soundOn} />}
    </>
  )
}
