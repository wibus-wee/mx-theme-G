import clsx from "clsx"
import styles from "./index.module.css"

export default function ErrorLayout(props: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx(styles["next-error"])}>
      <h1 className={clsx(styles["next-error-h1"])}>
        {props.title}
      </h1>
      <div className={clsx(styles["next-error-inner"])}>
        <h2 className={clsx(styles["next-error-h2"])}>
          {props.children}
        </h2>
        <h2 className={clsx(styles["next-error-h2"])}>
          接口地址：<b>{process.env.NEXT_PUBLIC_API_URL || "无法获取"}</b>
        </h2>
      </div>
    </div>
  )
}