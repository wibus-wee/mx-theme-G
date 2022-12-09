import { Twindow } from '@components/tools/Twindow'
import { isClientSide } from '@utils/env.util'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {

  if (isClientSide()) {
    window.onerror = (message, source, lineno, colno, error) => {
      console.log(111)
      Twindow({
        title: '遇到了一点问题捏 ~',
        text: `${message}`,
      })
    }
  }

  return (
    <>
      <NextSeo
        title={"Next.js + TypeScript + Valtio Starter"}
        description={"Next.js + TypeScript + Valtio Starter"}
      />


    </>
  )
}

export default Home
