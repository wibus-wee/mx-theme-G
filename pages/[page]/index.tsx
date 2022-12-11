import { PageModel } from "@mx-space/api-client"
import { transformDateFromCreatedAt } from "@utils/date.util"
import { apiClient } from "@utils/request.util"
import { NextPage } from "next"
import styles from "./index.module.css"
import clsx from "clsx"
import { useReadMask } from "@hooks/useReadMask"
import { Tocs } from '@components/universal/Tocs'
import { Markdown } from "@components/universal/Markdown"
export const getServerSideProps = async (context) => {
  const { page } = context.query
  const pages = await apiClient.page.getBySlug(page)
  return {
    props: pages
  }
}

export const Page: NextPage<PageModel> = (props) => {
  useReadMask()

  return (
    <>

      <div className={styles['container']}>
        <article itemScope itemType="http://schema.org/BlogPosting">
          <div
            className={
              clsx(
                styles['header'],
                props.meta?.cover && styles['has-cover']
              )
            }
          >
            {
              props.meta?.cover
              && (
                <>
                  <div className={styles['cover']}
                    style={{
                      backgroundImage: `url(${props.meta.cover})`
                      // backgroundImage: `url(${props.images[0].src})`
                    }}
                  />
                </>
              )
            }
            <h1 itemProp="name headline">{props.title}</h1>
            <p>
              {props.subtitle}
            </p>
          </div>
          <div className={"post-content"} itemProp="articleBody">
            <Markdown text={props.text} />
          </div>

          <div className={styles['footer']}>
            <div className={styles['lastest']}>
              最后修改于&nbsp;{transformDateFromCreatedAt(props.modified || props.created)}
            </div>
          </div>
        </article>
      </div>
      {<Tocs />}
    </>
  )
}

export default Page