import { useRef, useEffect } from 'react'

/**
 * useGameLoop: helper hook to manage RAF loop with a callback.
 * callback receives delta and now.
 */
export default function useGameLoop(callback, active = true) {
  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    let rafId = null
    let last = 0

    function loop(now) {
      const delta = now - last
      last = now
      cbRef.current(delta, now)
      rafId = requestAnimationFrame(loop)
    }

    if (active) {
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [active])
}
