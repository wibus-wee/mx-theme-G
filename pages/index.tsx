import { Card } from '@components/widgets/Card'
import { AggregateTop } from '@mx-space/api-client/.'
import { apiClient } from '@utils/request.util'
import { omit } from 'lodash'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import styles from "@styles/Home.module.css"

export const getServerSideProps = async () => {
  const aggregateData = await apiClient.aggregate.getTop(8)
  return {
    props: omit(
      aggregateData,
      ['says']
    )
  }
}

const Home: NextPage<AggregateTop> = (props) => {

  console.log('props', props)

  return (
    <>
      <NextSeo
        title={"Next.js + TypeScript + Valtio Starter"}
        description={"Next.js + TypeScript + Valtio Starter"}
      />

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
          })
        }
      </div>
    </>
  )
}

export default Home
