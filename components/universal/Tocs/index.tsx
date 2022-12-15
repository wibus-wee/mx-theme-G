import { useRootStore } from "@hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { Toc } from "./item"

export type TocProps = {
  headings: HTMLElement[]
}

export const MarkdownToc: FC<TocProps> = observer((props) => {
  const { appUIStore, actionsStore } = useRootStore()
  const {
    isNarrowThanLaptop,
    viewport: { mobile },
  } = appUIStore

  const { setTocs, resetTocs } = actionsStore
  useEffect(() => {

    if (props.headings.length == 0) {
      return
    }
    setTocs(
      <Toc headings={props.headings} />
    )
    return () => {
      resetTocs()
    }

  }, [actionsStore, isNarrowThanLaptop, mobile, props])

  return null
})

export const Tocs: FC = observer(() => {
  const { actionsStore } = useRootStore()
  const { tocs, isShowTocs } = actionsStore


  return (
    <>
      {
        isShowTocs && tocs.element
      }
    </>
  )
})