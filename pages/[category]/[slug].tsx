import { PostModel } from "@mx-space/api-client"
import { transformDateFromCreatedAt } from "@utils/date.util"
import { apiClient } from "@utils/request.util"
import { NextPage } from "next"
import Link from "next/link"
import styles from "./index.module.css"
import { Markdown } from '@mx-space/kami-design/dist/index.windi'
import { useState } from "react"
import { Twindow } from "@components/tools/Twindow"
import clsx from "clsx"
export const getServerSideProps = async (context) => {
  const { category, slug } = context.query
  const post = await apiClient.post.getPost(category, slug)
  return {
    props: post
  }
}

export const Post: NextPage<PostModel> = (props) => {

  const [like, setLike] = useState({
    count: props.count.like,
    icon: '👍'
  })

  const handleLike = async () => {
    await apiClient.post.thumbsUp(props.id).then(() => {
      setLike({
        count: like.count + 1,
        icon: '😍'
      })
      Twindow({
        title: "点赞成功 (´▽｀)",
        text: "感谢您的支持 (๑•̀ㅂ•́)و✧",
      })
    }).catch((err) => {
      Twindow({
        title: "点赞失败 (´▽｀)",
        text: "您已经点过赞了 (๑•̀ㅂ•́)و✧",
      })
    })
  }

  console.log(props.images)

  return (
    <div className={styles['container']}>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <div
          className={
            clsx(
              styles['header'],
              // props.meta?.cover && styles['has-cover']
              props.images?.length > 0 && styles['has-cover']
            )
          }
        >
          {
            // props.meta?.cover 
            props.images?.length > 0
            && (
              <>
                <div className={styles['cover']}
                  style={{
                    // backgroundImage: `url(${props.meta.cover})`
                    backgroundImage: `url(${props.images[0].src})`
                  }}
                />
              </>
            )
          }
          <h1 itemProp="name headline">{props.title}</h1>
          <p>
            <time itemProp="datePublished" dateTime={props.created}>{transformDateFromCreatedAt(props.created)}</time>
            &nbsp;·&nbsp;
            <Link href={`/categories/${props.category.slug}`} itemProp="articleSection" className={styles["category"]} >{props.category.name}</Link>
            &nbsp;·&nbsp;
            <span itemProp="interactionCount">{props.count.read} 次阅读</span>
          </p>
        </div>
        <div className={"content"} itemProp="articleBody">
          <Markdown codeBlockFully toc value={props.text} />
        </div>
        <div className={styles['actions']}>
          <a
            className={styles['action']}
            onClick={handleLike}
          >{like.icon} {like.count}</a>
        </div>
        <div className={styles['footer']}>
          <div>
            {props.tags.map((tag, index) => (
              <Link href={`/tags/${tag}`} key={index} className={styles['tag']}>
                {tag}
              </Link>
            ))}
          </div>
          <div className={styles['lastest']}>
            最后修改于&nbsp;{transformDateFromCreatedAt(props.modified || props.created)}
          </div>
        </div>
      </article>
    </div>
  )
}

export default Post