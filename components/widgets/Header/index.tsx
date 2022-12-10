import { useInitialData } from "@hooks/useStore"
import { useRouter } from "next/router"
import styles from "./index.module.css"

export const Header = () => {
  const router = useRouter()
  const { pathname } = router
  const {
    seo: { title, description },
    pageMeta
  } = useInitialData()
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <p>{description}</p>
        </div>
        <div className={styles.content_right}>
          <nav>
            <a href="/" className={pathname === "/" ? styles.active : ''}>首页</a>
            {
              pageMeta?.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={`/${item.slug}`}
                    className={pathname === `/${item.slug}` ? styles.active : ''}
                  >
                    {item.title}
                  </a>
                )
              })
            }
          </nav>
        </div>
      </div>
    </header>
  )

}