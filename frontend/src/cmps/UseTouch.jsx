import { useEffect, useState } from 'react'

const useTouch = (
  ref,
  onTouch,
) => {
  const [startPoint, setStartPoint] = useState(null)
  const [endPoint, setEndPoint] = useState(null)
  const [direction, setDirection] = useState(null)

  useEffect(() => {
    const handleTouchStart = function (e) {
      setStartPoint(e.touches[0])
      setEndPoint(null)
    }
    const handleTouchMove = function (e) {
      setEndPoint(e.touches[0])
    }

    const target = ref?.current
    if (!target) return
    target.addEventListener('touchstart', handleTouchStart)
    target.addEventListener('touchmove', handleTouchMove)

    return () => {
      target.removeEventListener('touchstart', handleTouchStart)
      target.removeEventListener('touchmove', handleTouchMove)
    }
  }, [ref])

  useEffect(() => {
    if (startPoint && endPoint) {
      const diffX = startPoint.clientX - endPoint.clientX
      const diffY = startPoint.clientY - endPoint.clientY

      let direction
      if (Math.abs(diffX) > 50+Math.abs(diffY)) {
        if (diffX > 0) {
          direction = 'left'
        } else {
          direction = 'right'
        }
      } else {
        if (diffY > 0) {
          direction = 'top'
        } else {
          direction = 'bottom'
        }
      }

      setDirection(direction)
    } else {
      setDirection(null)
    }
  }, [startPoint, endPoint])

  useEffect(() => {
    if (direction) {
      onTouch(direction)
    }
  }, [direction, onTouch])
}

  export default useTouch;