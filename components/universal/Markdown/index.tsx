import { sanitizeUrl } from '@innei/markdown-to-jsx'
import { Markdown as KamiMarkdown } from '@mx-space/kami-design/dist/index.windi'
import { Fragment, createElement } from 'react'
import { CodeBlock } from '../CodeBlock'
import { MarkdownToc } from '../Tocs'
export const Markdown = (props: { text: string }) => {
  return (
    <KamiMarkdown
      toc
      tocSlot={MarkdownToc}
      value={props.text}
      extendsRules={{
        heading: {
          react(node, output, state) {
            const { level, content } = node
            const id = content[0].content.replace(/\s/g, '-').toLowerCase()
            return (
              <Fragment key={state?.key}>
                {
                  createElement(
                    `h${level}`,
                    {
                      id,
                      key: state?.key,
                      className: `heading-${level}`,
                    },
                    output(content, state!),
                  )
                }
              </Fragment>
            )
          }
        },

        codeBlock: {
          react(node, output, state) {
            return (
              <CodeBlock
                key={state?.key}
                content={node.content}
                lang={node.lang}
              />
            )
          },
        },
        footnoteReference: {
          react(node, output, state) {
            const { footnoteMap, target, content } = node
            const footnote = footnoteMap.get(content)
            // const linkCardId = (() => {
            //   try {
            //     const thisUrl = new URL(
            //       footnote?.footnote?.replace(': ', ''),
            //     )
            //     const isCurrentHost =
            //       thisUrl.hostname === window.location.hostname

            //     if (!isCurrentHost && !isDev) {
            //       return undefined
            //     }
            //     const pathname = thisUrl.pathname
            //     return pathname.slice(1)
            //   } catch {
            //     return undefined
            //   }
            // })()

            return (
              <Fragment key={state?.key}>
                <a
                  href={sanitizeUrl(target)!}
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({
                      top: document.getElementById(target)?.offsetTop,
                      behavior: 'smooth',
                    })
                  }}
                >
                  <sup key={state?.key}>^{content}</sup>
                </a>
                {/* {linkCardId && (
                        <LinkCard id={linkCardId} key={state?.key} />
                      )} */}
              </Fragment>
            )
          },
        },
      }}
      {...props}
    />
  )
}