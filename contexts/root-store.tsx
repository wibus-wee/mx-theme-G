import { configure } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { createContext } from 'react'
import { RootStore } from '@stores/root'
import { isClientSide, isDev, isServerSide } from '@utils/env.util'

enableStaticRendering(isServerSide())

configure({
  useProxies: 'always',
})


let $store: RootStore
export const RootStoreContext = createContext<RootStore | undefined>(undefined)
RootStoreContext.displayName = 'RootStoreContext'

function initializeStore(initialData?: RootStore) {
  const store = $store ?? new RootStore()
  if (initialData) {
    store.appUIStore = initialData.appUIStore // hydrate initial data
  }
  if (isServerSide()) {
    return store // 服务端渲染时，每次请求都会创建一个新的 store
  }
  if (!$store) {
    $store = store // 如果是客户端，只创建一次 store
  }
  return store
}

export const $RootStore = initializeStore()

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  if (isDev() && isClientSide() && !window.store){
    Object.defineProperty(window, 'store', {
      get: () => $store,
    })
  }
  return (
    <RootStoreContext.Provider value={$RootStore}>
      {children}
    </RootStoreContext.Provider>
  )
}