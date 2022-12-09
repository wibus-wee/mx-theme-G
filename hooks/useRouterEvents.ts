/*
 * @FilePath: /mog-theme-iucky/hooks/useRouterEvents.ts
 * @author: Wibus
 * @Date: 2022-10-30 10:00:53
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-30 11:09:32
 * Coding With IU
 */
import { Twindow } from '@components/tools/Twindow'
import { isServerSide, isClientSide } from '@utils/env.util'
import { Router } from 'next/router'
import QProgress from 'qier-progress'
import { useEffect } from 'react'
import { useTrack } from './useTrack'

export const useRouterEvent = () => {
  const { pageView } = useTrack();

  useEffect(() => {
    const Progress = new QProgress({ colorful: false, color: 'var(--iucky-main)' })
    if (isServerSide()) return

    if (isClientSide()) {
      ; (window as any).process = Progress
    }
    Router.events.on('routeChangeStart', () => {
      // animation('out')

      Twindow({
        title: '页面开始切换哩 (._.)',
        text: "等待一下哦，我正在加载页面",
      })

      Progress.start()
      // window.scrollTo({ top: 0, behavior: 'smooth' })
      history.backPath = history.backPath
        ? [...history.backPath, history.state.as]
        : [history.state.as]
    })

    Router.events.on('routeChangeComplete', (url) => {
      // animation('in')
      Progress.finish()
      Twindow({
        title: '页面切换完成啦 (๑•̀ㅂ•́)و✧',
        text: "页面加载完成啦，欢迎回来",
      })
      pageView(url)
    })

    Router.events.on('routeChangeError', () => {
      // animation('in')
      history.backPath?.pop()
      Progress.finish()
      Twindow({
        title: '页面切换出现问题哩 (._.)',
        text: "出现了未知错误, 刷新试试?"
      })
    })
  }, [])
}