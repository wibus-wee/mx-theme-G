/*
 * @FilePath: /mog-theme-iucky/hooks/useTrack.ts
 * @author: Wibus
 * @Date: 2022-10-30 09:51:48
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-30 10:00:20
 * Coding With IU
 */

import { isDev } from "@utils/env.util"
import { useCallback } from "react"
import { TrackerOptions } from "types/tracker"

export const useTrack = () => {

  const pageView = useCallback(
    (path: string) => {
      window.umami && window.umami?.trackView(path)
    },
    []
  )

  const event = useCallback(
    (options: TrackerOptions) => {
      const { action, label, category = label, value } = options
      if (isDev()) {
        console.info('event', options)
        return
      }
      try {
        window.umami && window.umami?.trackEvent(label || value?.toString() || '', action)
      } catch (e) {
        console.info(e)
      }

    },
    []
  )

  return {
    event,
    pageView,
  }
}
