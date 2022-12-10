import { CategoryModel } from "@mx-space/api-client"
import styles from "./index.module.css"

interface ICard {
  date: string
  category?: CategoryModel
  title: string
  slug: string | number
  isNote?: boolean
}

export const Card = ({ date, category, title, slug, isNote }: ICard) => {
  return (
    <div className={styles.item}>
      <h2>
        <a href={
          !isNote ? `/posts/${slug}` : `/notes/${slug}`
        }>{title}</a>
      </h2>
      <div className={styles.meta}>
        <span>
          {
            !isNote && category && (
              <a href={`/categories/${category.slug}`}>{category.name}</a>
            )
          }
          {
            isNote && (
              <a href={`/notes/${slug}`}>Note</a>
            )
          }
        </span>
        <span>{date.split("T")[0]}</span>
      </div>
      <div className={styles.wrap} />
      <div className={styles.image}
        style={{
          backgroundImage: `url(${`https://api.ixiaowai.cn/mcapi/mcapi.php?time=${Number(Math.random().toFixed(2)) * 100}`})`,
        }}
      />
    </div>
  )
}