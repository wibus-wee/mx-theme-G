import '../styles/globals.css'
import NextApp from 'next/app'
import type { AppContext } from 'next/app'
import { getInitData } from '@utils/init.util'
import { InitialDataType, InitialProvider } from '@contexts/initial-data'
import { attachRequestProxy } from '@utils/request.util'
import { RootStoreProvider } from '@contexts/root-store'
import { FC, memo, PropsWithChildren, useMemo } from 'react'
import { BaseLayout } from '@layouts/BaseLayout'

interface DataModel {
  initData: any
}

const App: React.FC<DataModel & { Component: any; pageProps: any; err: any }> = (
  props,
) => {
  const { initData, Component, pageProps } = props

  const innerComp = useMemo(() => {
    return initData ? (
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    ) : (
      <>
        <h1>
          Missing initial data.Make sure you have run `getInitialProps` before ?
        </h1 >
      </>
    )
  }, [initData, Component, pageProps])

  return (
    <RootStoreProvider>
      <InitialProvider
        initialData={initData}
      >
        {innerComp}
      </InitialProvider>
    </RootStoreProvider>
  )
}


const Wrapper: FC<PropsWithChildren> = memo((props) => {

  return (
    <>
      <BaseLayout>
        {props.children}
      </BaseLayout>
    </>
  )
})
Wrapper.displayName = 'Wrapper'


// @ts-ignore
App.getInitialProps = async (appContext: AppContext) => {
  const ctx = appContext.ctx
  const request = ctx.req

  attachRequestProxy(request)

  const data: InitialDataType & { reason?: any } = await getInitData();
  const appProps = (async () => {
    try {
      // Next 会从小组件向上渲染整个页面，有可能在此报错。兜底
      return await NextApp.getInitialProps(appContext)
    } catch (e) {
      // TODO next rfc Layout, 出了就重构这里
      // 只有无数据 也就是 服务端不跑起来 或者接口不对的时候 捕获异常
      // 这是为什么呢 说来说去还是 nextjs 太辣鸡了 只能各种 hack
      // 只能这样了

      if (!data.reason) {
        // 这里抛出，和官网直接 await getProps 一样，异常走到 _error 处理
        throw e
      }
      // 这里捕获， 为了走全局无数据页
      if (ctx.res) {
        ctx.res.statusCode = 466
        ctx.res.statusMessage = 'No Data'
      }
      return null
    }
  })
  return { ...appProps, initData: data }
};

export default App
