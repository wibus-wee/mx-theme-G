
import { useRootStore } from "@hooks/useStore";
import { AggregateRoot } from "@mx-space/api-client";
import { createContext, useMemo } from "react";
import { GConfig } from "types/theme-config";

export type InitialDataType = {
  aggregateData: AggregateRoot
  config: GConfig
}

export const InitialContext = createContext({} as InitialDataType)

export const InitialProvider = ({ children, initialData }: any) => {
  const { configStore } = useRootStore()
  configStore.updateConfig(initialData)
  const value = useMemo(() => initialData, [initialData])

  return (
    <InitialContext.Provider value={value}>
      {children}
    </InitialContext.Provider>
  )
}