import styles from "./index.module.css"

export const Footer = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <div className={styles.title}>
            <h1>Stay hungry. Stay foolish.</h1>
          </div>
          <p>Power by <a href="https://github.com/mx-space/core">mx-space.</a> <a href="https://github.com/wibus-wee/mx-theme-G">G.</a></p>
        </div>
        <div className={styles.content_right}>
          <nav>
            <a href="/about">关于</a>
            <a href="/feed">RSS 订阅</a>
            <a href="/sitemap">站点地图</a>
            <a href="#">开往</a>
          </nav>
          <p>1 个小伙伴正在浏览</p>
        </div>
      </div>
    </header>
  )

}