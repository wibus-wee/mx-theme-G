import { useInitialData } from "@hooks/useStore"
import Link from "next/link"
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
            <Link href="/" className={pathname === "/" ? styles.active : ''}>首页</Link>
            {
              pageMeta?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`/${item.slug}`}
                    className={pathname === `/${item.slug}` ? styles.active : ''}
                  >
                    {item.title}
                  </Link>
                )
              })
            }
          </nav>
        </div>
      </div>
      <img src="https://cdn.exia.xyz/img/blog/42.webp" alt="header-image"
        className={styles.header_image}
      />
    </header>
  )

}