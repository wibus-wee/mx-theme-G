
import { $RootStore } from "@contexts/root-store";
import { useConsole } from "@hooks/useConsole";
import { useResetDirection } from "@hooks/useResetDirection";
import { useRouterEvent } from "@hooks/useRouterEvents";
import { useActionsStore, useGConfig, useRootStore } from "@hooks/useStore";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect } from "react";
import styles from "./index.module.css"

export const BaseLayout: React.FC<PropsWithChildren> = observer((props) => {
  useResetDirection()
  useRouterEvent();
  useConsole();

  useEffect(() => {
    $RootStore.appUIStore.updateViewport()
    window.onresize = () => { $RootStore.appUIStore.updateViewport() }
    // 获取当前 mediaType
    const mediaType = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    $RootStore.appUIStore.colorMode = mediaType
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      $RootStore.appUIStore.colorMode = e.matches ? 'dark' : 'light'
    })
  }, [])

  const config = useGConfig()

  const { isShowTocs } = useActionsStore()

  return (
    <>
      <style>
        {`
        :root {
          --background-image-light: url(${config?.site.backgrounds?.background?.src.light});
          --background-image-dark: url(${config?.site.backgrounds?.background?.src.dark});
        }
        `}
      </style>
      <main className={clsx(styles.main,
          isShowTocs && styles['main-tocs'],
        )}>
        {props.children}
      </main>
      <div
        className={
          `dark-mask ${useRootStore().appUIStore.readMask && 'read-mask'} ${!useRootStore().appUIStore.readMask && 'un-read-mask'}`}/>
    </>
  );
})