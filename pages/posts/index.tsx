import { Button } from "@components/universal/Button";
import { Card } from "@components/widgets/Card";
import { PaginateResult, PostModel } from "@mx-space/api-client";
import { apiClient } from "@utils/request.util";
import { NextPage, NextPageContext } from "next";
import styles from "./index.module.css"
import { motion } from "framer-motion"

export async function getServerSideProps(ctx: NextPageContext): Promise<{ props: IPostPage }> {
  const { page: ctxPage } = ctx.query;
  const page = Number.isNaN(ctxPage) || !ctxPage ? 1 : Number(ctxPage);
  const posts = await apiClient.post.getList(Number(page));
  return {
    props: {
      posts,
      page
    }
  }
}

interface IPostPage {
  posts: PaginateResult<PostModel>
  page: number
}

export const Posts: NextPage<IPostPage> = (props) => {
  console.log(props)
  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

      >
        {
          props.posts?.data?.map((post, index) => {
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


      </motion.div>
      <div className={styles.more}>
        {
          props.posts.pagination.hasPrevPage && <Button
            style={{ float: "left" }}
            href={`/posts?page=${props.page - 1}`}
            text="前面的 <"
          />
        }
        {
          props.posts.pagination.hasNextPage && <Button
            style={{ float: "right" }}
            href={`/posts?page=${props.page + 1}`}
            text="更多 >"
          />
        }
      </div>
    </>
  )
}

// Posts.getInitialProps = async (ctx: NextPageContext) => {
//   const query = ctx.query;
//   console.log(query)
//   return {
//     props: {
//       query
//     }
//   }
// }

export default Posts