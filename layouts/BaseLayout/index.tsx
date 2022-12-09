
import { $RootStore } from "@contexts/root-store";
import { useResetDirection } from "@hooks/useResetDirection";
import { useRouterEvent } from "@hooks/useRouterEvents";
import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect } from "react";

export const BaseLayout: React.FC<PropsWithChildren> = observer((props) => {
  useResetDirection()
  useRouterEvent();

  useEffect(() => {
    $RootStore.appUIStore.updateViewport()
    window.onresize = () => { $RootStore.appUIStore.updateViewport() }
  }, [])

  return (
    <main>
      {props.children}
    </main>
  );
})