import '../styles/globals.css'
import type { AppContext } from 'next/app'
import { Router } from 'next/router'
import { useCallback, useEffect } from 'react'
import { message } from 'react-message-popup'
import QP from 'qier-progress'
import { apiClient } from '../utils/request.util'
import NextApp from 'next/app'

function App({ initialData, Component, pageProps }) {

  const Progress = new QP({ colorful: false, color: '#27ae60' })
  const registerRouterEvents = useCallback(() => {
    Router.events.on('routeChangeStart', () => {
      // animation('out')

      Progress.start()
      // window.scrollTo({ top: 0, behavior: 'smooth' })
      history.backPath = history.backPath
        ? [...history.backPath, history.state.as]
        : [history.state.as]
    })

    Router.events.on('routeChangeComplete', () => {
      // animation('in')
      Progress.finish()
    })

    Router.events.on('routeChangeError', () => {
      // animation('in')
      history.backPath?.pop()
      Progress.finish()
      message.error('出现了未知错误, 刷新试试?')
    })
  }, [])

  useEffect(() => {
    try {
      registerRouterEvents()
    } finally {
      document.body.classList.remove('loading')
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

// @ts-ignore
// App.getInitialProps = async (props: AppContext) => {

// }

export default App
