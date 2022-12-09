/**
 * @author innei
 * @reference https://github.com/mx-space/kami/blob/796a0366f69a4a94ed52d1acb32e555e457fd003/src/hooks/use-resize-scroll-event.ts#L1-L49
 */

import debounce from 'lodash-es/debounce'
import throttle from 'lodash-es/throttle'
import { useEffect, useRef } from 'react'
import { useStore } from './useStore'


export const useResetDirection = () => {
  const _currentY = useRef(0)
  const { appUIStore: app } = useStore()

  useEffect(() => {
    const handleScroll = throttle(
      () => {
        const currentY = document.documentElement.scrollTop
        const shouldUpdateDirection =
          Math.abs(_currentY.current - currentY) > 100;

        if (shouldUpdateDirection) {
          const direction = _currentY.current > currentY ? 'up' : 'down'
          app.updatePosition(direction, currentY)
          _currentY.current = currentY
        } else {
          app.updatePosition(app.scrollDirection, currentY)
        }
      },
      16,
      { leading: false },
    )

    const resizeHandler = debounce(
      () => {
        app.updateViewport()
      },
      500,
      { leading: true },
    )
    window.onresize = resizeHandler
    app.updateViewport()

    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.onresize = null
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
