import { CategoryModel } from "@mx-space/api-client"
import Link from "next/link"
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
        <Link href={
          !isNote ? `/${category!.slug}/${slug}` : `/notes/${slug}`
        }>{title}</Link>
      </h2>
      <div className={styles.meta}>
        <span>
          {
            !isNote && category && (
              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            )
          }
          {
            isNote && (
              <Link href={`/notes/${slug}`}>Note</Link>
            )
          }
        </span>
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