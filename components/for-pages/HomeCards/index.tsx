import { Button } from "@components/universal/Button"
import { Card } from "@components/widgets/Card"
import { AggregateTop } from "@mx-space/api-client"
import { FC, memo } from "react"
import styles from "./index.module.css"

export const HomeCards: FC<AggregateTop> = memo((props) => {

  return (
    <>
      <div className={styles.container}>
        {
          props.posts?.map((post, index) => {
            return (
              <Card
                key={index}
                date={post.created}
                category={post.category}
                title={post.title}
                slug={post.slug}
              />
            )
          })}


      </div>
      <div className={styles.more}>
        <Button
          style={{ float: "right" }}
          href="/posts"
          text="更多 >"
        />
      </div>
    </>
  )
})