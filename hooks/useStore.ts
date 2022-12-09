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

export function useThemeConfig() {
  const { configStore } = useRootStore()
  return configStore.getConfig("config")
}