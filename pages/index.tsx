import { AggregateTop } from '@mx-space/api-client'
import { apiClient } from '@utils/request.util'
import { omit } from 'lodash'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useInitialData } from '@hooks/useStore'
import { HomeCards } from '@components/for-pages/HomeCards'

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

  const initialData = useInitialData()

  return (
    <>
      <NextSeo
        title={`${initialData.seo.title} · ${initialData.seo.description}`}
        description={initialData.seo.description}
      />

      <HomeCards
        {...props}
      />
    </>
  )
}

export default Home
