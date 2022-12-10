import { InitialContext } from "@contexts/initial-data"
import { RootStoreContext } from "@contexts/root-store"
import { useContext } from "react"


export function useRootStore() {
  const store = useContext(RootStoreContext)
  if (store === undefined) {
    throw new Error('useRootStore must be used within a RootStoreProvider')
  }
  return store
}

export const useStore = useRootStore

export const useInitialData = () => {
  return useContext(InitialContext).aggregateData
}

export const useThemeConfig = () => {
  const config = useContext(InitialContext).config

  return config
}

export { useThemeConfig as useGConfig }