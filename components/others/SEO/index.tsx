/*
 * @FilePath: /nx-theme-tiny/components/others/SEO/index.tsx
 * @author: Wibus
 * @Date: 2022-08-09 14:27:23
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 14:40:24
 * Coding With IU
 */
import { useStore } from '@hooks/useStore'
import merge from 'lodash-es/merge'
import { observer } from 'mobx-react-lite'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import type { OpenGraph } from 'next-seo/lib/types'
import type { FC } from 'react'

type SEOProps = {
  title: string
  description?: string
  openGraph?: { type?: 'website' | 'article' } & OpenGraph
} & NextSeoProps

export const SEO: FC<SEOProps> = observer((props) => {
  const { title, description, openGraph, ...rest } = props
  const { configStore } = useStore()
  const userStore = configStore.getConfig().user

  const Title = `${title}`

  return (
    <NextSeo
      {...{
        title,
        titleTemplate:title,
        openGraph: merge(
          {
            profile: {
              username: userStore.nickname,
            },
            type: 'article',
            locale: 'zh-cn',
            site_name: userStore.description || '',
            description: description || userStore.description || '',
            article: {
              authors: [userStore.nickname as string],
            },
            title: Title,
          } as OpenGraph,
          openGraph,
        ),
        description: description || userStore.description || '',
        ...rest,
      }}
    />
  )
})

export const Seo = SEO
